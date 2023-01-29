import express from "express";
import {
  getItem,
  getItemId,
  postItem,
  updateItem,
} from "../controllers/itemController.js";
import {
  validItemDuplicate,
  validItemExist,
} from "../middleware/itemMiddleware.js";
import db from "../database/database.js";
import { validItem, validItemId } from "../middleware/schemaMiddleware.js";

const itemRouter = express.Router();
itemRouter.post("/items", validItem, validItemDuplicate, postItem);
itemRouter.get("/items", getItem);
itemRouter.get("/items/:idItem", validItemId, getItemId);
itemRouter.put(
  "/items/:idItem",
  validItem,
  validItemId,
  validItemExist,
  updateItem
);

const items = [
  {
    nameItem: "Renault Kwid",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/2023/kwid/Home-1.jpg.ximg.largex2.webp/f013134239.webp",
    valueItem: 60000,
    quantityItem: 20,
  },
  {
    nameItem: "Renault Duster",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/2022/julho/duster/RENAULT_DUSTER_HJD_4x2_ICONIC_BRAZIL_KV_EXTERIOR_1_ALL_FORMATS_2560x1440%20(1).jpg.ximg.largex2.webp/8381b3f3a8.webp",
    valueItem: 111000,
    quantityItem: 10,
  },
  {
    nameItem: "Renault Sandero",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/sandero-s-edition/ambientada.jpg.ximg.largex2.webp/d260de397d.webp",
    valueItem: 84000,
    quantityItem: 20,
  },
  {
    nameItem: "Renault Stepway",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/2022/setembro/stepway-10/Hero-de-Produto-_2560x1440.jpg.ximg.largex2.webp/d39a578981.webp",
    valueItem: 80000,
    quantityItem: 20,
  },
  {
    nameItem: "Renault Logan",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/2022/dezembro/logan/ReSize_Logan_2560x1440_32.jpg.ximg.largex2.webp/2be8f46703.webp",
    valueItem: 89000,
    quantityItem: 20,
  },
  {
    nameItem: "Renault Oroch",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/2022/outubro/oroch/HOME%20HERO-PRODUTO-2560x1440.jpg.ximg.largex2.webp/3b18e96d30.webp",
    valueItem: 114000,
    quantityItem: 20,
  },
  {
    nameItem: "Renault Captur",
    imageItem:
      "https://cdn.group.renault.com/ren/br/renault-new-cars/product-plans/captur/novo-captur/captur-hero-produto.jpg.ximg.largex2.webp/3564250989.webp",
    valueItem: 143000,
    quantityItem: 10,
  },
];
const itemsExist = await db.collection("items").find({}).toArray();
if (itemsExist.length === 0) {
  items.map(async (i) => {
    await db.collection("items").insertOne({
      nameItem: i.nameItem,
      imageItem: i.imageItem,
      valueItem: i.valueItem,
      quantityItem: i.quantityItem,
    });
  });
}

export default itemRouter;
