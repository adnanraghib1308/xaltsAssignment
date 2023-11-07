import { prisma } from "../../dao/utils";
import { assertNonEmpty, HandledError, reqWrapper, sendEmail } from "../../helpers/utils";

const router = require("express").Router();

const createProcess = reqWrapper(async (req, res) => {
  let process;
  if(req.body.id) {
    process = await prisma.process.update({
      data: {
        name: req.body.name,
        createrId: req.user.id,
        userIds: req.body.userIds,
        comment: req.body?.comment,
        photoUrl: req.body?.photoUrl,
        commentVisibleIds: req.body?.commentVisibleIds,
      },
      where: { id: req.body.id }
    });
    for(const userId of req.body.userIds) {
      await prisma.processUserMap.updateMany({ data: { userId, processId: process.id, isCommentVisible: req.body.commentVisibleIds.includes(userId) }, where: { userId, processId: process.id} });
    }
  } else {
    process = await prisma.process.create({
      data: {
        name: req.body.name,
        createrId: req.user.id,
        userIds: req.body.userIds,
        comment: req.body?.comment,
        photoUrl: req.body?.photoUrl,
        commentVisibleIds: req.body?.commentVisibleIds,
      },
    });
    for (const userId of req.body.userIds) {
      await prisma.processUserMap.create({ data: { userId, processId: process.id, isCommentVisible: req.body.commentVisibleIds.includes(userId) } });
    }

    // send process creation email to all users
    const users = await prisma.user.findMany({ where: { id: { in: req.body.userIds }}});
    for(const user of users) {
      await sendEmail({ to: user.email, subject: `New process created`, text: `Hey ${user.name}, A new process has been created just now by ${req.user.name}. Plese sign off this process.`})
    }
  }
  return res.sendResponse({ data: process });
})

const listProcessToSign = reqWrapper(async (req, res) => {
  const userId = req.user.id;
  const processUserMap = await prisma.processUserMap.findMany({ where: { userId, hasUserSigned: false }});
  const mapObj: any = processUserMap.reduce((prev: any, curr: any) => {
    prev[curr.processId] = curr;
    return prev;
  }, {})
  
  let process: any = await prisma.process.findMany({ where: { id: { in: processUserMap.map((puMap) => puMap.processId)}}});
  process = process.map((pr: any) => ({
    id: pr.id,
    name: pr.name,
    comment: mapObj[pr.id].isCommentVisible ? pr.comment : null,
    photoUrl: pr.photoUrl
  }))
  return res.sendResponse({ data: process })
})

const signOffProcess = reqWrapper(async (req, res) => {
  const { processId } = req.body;
  assertNonEmpty({ processId });

  const processUserMap = await prisma.processUserMap.findFirst({ where: { userId: req.user.id, processId: parseInt(processId) }});
  if(!processUserMap) throw new HandledError('Cant find user process mapping');

  const process = await prisma.process.findFirst({ where: { id: processUserMap.processId }});
  const processCreator = await prisma.user.findFirst({ where: { id: process?.createrId }});
  await prisma.processUserMap.updateMany({ data: { hasUserSigned: true }, where: { userId: req.user.id, processId: process?.id }})

  await sendEmail({ to: processCreator?.email as string, subject: "User has signed off the prococess", text: `Hey ${processCreator?.name}, User ${req.user.name} has just signed off the process. Name of process is ${process?.name} and id is ${process?.id}` });

  // check if every one has signed off. if yes send email to every party
  const allProcessMap = await prisma.processUserMap.findMany({ where: { processId: process?.id }});
  let hasEveryoneSignedOff = true;
  for (const map of allProcessMap) {
    if(!map.hasUserSigned) {
      hasEveryoneSignedOff = false;
      break;
    }
  }
  if(hasEveryoneSignedOff) {
    const userIds: any = allProcessMap.forEach((map) => map.userId);
    const users = await prisma.user.findMany({ where: { id: { in: userIds }}});
    for(const user of users) {
      await sendEmail({
        to: user?.email as string,
        subject: "All users has signed off the prococess",
        text: `Hey ${user?.name}, Congratulations all users has signed off the process. Name of process is ${process?.name} and id is ${process?.id}`,
      });
    }
  }

  res.sendResponse({ message: "success" })
})

router.post('/', createProcess);
router.get('/', listProcessToSign);
router.post('/signOff', signOffProcess);

export = router;