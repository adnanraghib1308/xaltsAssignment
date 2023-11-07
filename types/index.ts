export type Shop = {
  id?: number,
  name:            String
  rawAddress:      String
  latitude:        String
  longitude:      String
  createdAt:       Date          
  updatedAt:      Date          
  // UserShopMapping UserShopMapping[]
  // Attendance      Attendance[]
  // ShopSkuMapping  ShopSkuMapping[]
  // SalesTracking   SalesTracking[]
}


// USER
export type User = {
  id?:    number
  name:            String
  email:           String           
  gender:          String
  password?:        String
  phoneNumber?:     String           
  isAdmin?:         Boolean       
  createdAt?:       Date          
  updatedAt?:       Date         
}

// User Shop Mapping
export type UserShopMapping = {
  id?: number
  userId:    number
  shopId:    number
  // User      User     @relation(fields: [userId], references: [id])
  // Shop      Shop     @relation(fields: [shopId], references: [id])
  createdAt: Date 
  updatedAt: Date
}

// Attendance
export type Attendance = {
  id:        number     
  shopId:    number
  userId:    number
  latitude:  String
  longitude: String
  // Shop      Shop     @relation(fields: [shopId], references: [id])
  // User      User     @relation(fields: [userId], references: [id])
  createdAt: Date
  updatedAt: Date
}

// Category
export type Category = {
  id?:        number      
  name:      String
  createdAt: Date 
  updatedAt: Date 
  // Product   Product[]
}

// Product
export type Product = {
  id?:         number     
  categoryId: number
  // Cateogry   Category @relation(fields: [categoryId], references: [id])
  name:       String
  createdAt:  Date
  updatedAt:  Date
  // Sku        Sku[]
}

// Sku
export type Sku = {
  id?:             number             
  name:           String
  mrp:            number
  productId:      number
  // Product        Product          @relation(fields: [productId], references: [id])
  createdAt:      Date        
  updatedAt:      Date        
  // ShopSkuMapping ShopSkuMapping[]
  // SalesTracking  SalesTracking[]
}

// ShopSkuMapping
export type ShopSkuMapping = {
  id?:        number     
  shopId:    number
  skuId:    number
  stock:     number
  // Sku       Sku      @relation(fields: [skuId], references: [id])
  // Shop      Shop     @relation(fields: [shopId], references: [id])
  createdAt: Date
  updatedAt: Date
}

// SalesTracking
export type SalesTracking = {
  id?:         number  
  shopId:     number
  skuId:      number
  quantity:   number
  saleAmount: number
  // Shop       Shop  @relation(fields: [shopId], references: [id])
  // Sku        Sku   @relation(fields: [skuId], references: [id])
}