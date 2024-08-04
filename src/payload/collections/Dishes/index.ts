import type { CollectionConfig } from "payload/types";

import adminAndCreatedByUser from "../Users/access/adminAndCreatedByUser";

const Dishes: CollectionConfig = {
  access: {
    create: () => true,
    delete: adminAndCreatedByUser,
    read: adminAndCreatedByUser,
    update: adminAndCreatedByUser,
  },

  admin: {
    defaultColumns: ["title", "price", "availableAmount", "cookTime"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Название блюда",
      required: true,
      type: "text",
    },
    {
      name: "description",
      label: "Описание (состав)",
      maxLength: 200,
      required: true,
      type: "textarea",
    },
    {
      name: "price",
      label: "Цена (в манатах)",
      required: true,
      type: "number",
    },

    {
      name: "gram",
      label: "Вес (в граммах)",
      required: true,
      type: "number",
    },
    {
      name: "availableAmount",
      defaultValue: 30,
      label: "Доступно в наличии",
      required: false,
      type: "number",
    },

    {
      name: "cookTime",
      defaultValue: 30,
      label: "Время приготовления (в минутах)",
      required: true,
      type: "number",
    },
    {
      name: "image",
      label: "Изображение блюда",
      relationTo: "media",
      required: false,
      type: "upload",
    },
    {
      name: "restaurant",
      label: "Выберите свой ресторан",
      relationTo: "restaurants",
      required: true,
      type: "relationship",
    },
    {
      name: "createdBy",
      admin: {
        hidden: true,
      },
      label: "Пользователь",
      relationTo: "users",
      type: "relationship",
    },
    {
      name: "isBlocked",
      defaultValue: false,
      label: "Заблокировано",
      required: false,
      type: "checkbox",
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (req.user && !data.createdBy) {
          data.createdBy = req.user.id;
        }
        return data;
      },
    ],
  },
  slug: "dishes",
  timestamps: true,
};

export default Dishes;