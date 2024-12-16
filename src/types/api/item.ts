// export type CategoryType = "BACKGROUND" | "FLOWER" | "ETC";
export type CategoryType = "GROUND" | "TREE" | "FLOWER" | "ETC";

export interface ItemType {
  itemId: number;
  userId: number;
  name: string;
  price: number;
  imageUri: string;
  category: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

export type GetMyItemRes = {
  itemId: number;
  imageUri: string;
  itemName: string;
  category: CategoryType;
  myItemIds: number[];
};

export type PurchaseItemRes = {
  myItemId: number;
  itemId: number;
  itemName: string;
  imageUri: string;
  category: CategoryType;
}[];

export interface Position {
  posX: number;
  posY: number;
}

// POST usingItem Resquest
export interface CreateUsingItemsReq {
  action: "CREATE";
  myItemId: number;
}
export interface UpdateUsingItemsReq extends Position {
  action: "UPDATE" | "DELETE";
  usingItemId: number;
  myItemId: number;
}

// GET, POST usingItem Response
export interface GetUsingItemsRes extends Position {
  myItemId: number;
  imageUri: string;
  category: CategoryType;
}
