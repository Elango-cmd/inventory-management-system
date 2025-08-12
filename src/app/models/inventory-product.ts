import { InventorySupplier } from "./inventory-supplier";

export class InventoryProduct {
  productId?: number;
  name!: string;
  description?: string;
  quantity!: number;
  price!: number;
  category?: string;
  inventorySupplierDTO!: InventorySupplier;
}
