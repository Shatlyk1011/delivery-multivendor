import Link from "next/link";
import { FC } from "react";
import { cn } from "@/app/shared/lib/utils";

interface Props {
  onSubmit: any;
  t: any;
  totalPrice: string;
  deliveryPrice: number;
  restaurantTitle: string;
  restaurantId: string;
  disabled: boolean;
}

const Index: FC<Props> = ({ t, totalPrice, deliveryPrice = 0, onSubmit, restaurantTitle, restaurantId, disabled }) => {
  return (
    <div className="w-full rounded-[32px] bg-bg-1 p-8 md:rounded-3xl md:p-6 sm:p-4">
      <h5 className="mb-2.5 border-b border-gray-1 pb-2.5 text-xl font-medium leading-6 sm:text-lg">
        {t("BucketPage.summary")}
      </h5>
      <Link
        href={`/restaurant/${restaurantId}`}
        className={cn(
          "mb-1 inline-block border-b border-[transparent] pb-1 pt-2 text-lg font-medium leading-[1] transition hover:border-[currentColor]",
        )}
      >
        {restaurantTitle}
      </Link>
      <ul className="mb-3 space-y-3">
        <li className="flex justify-between sm:text-sm">
          {t("BucketPage.price")}
          <span>{totalPrice}TMT</span>
        </li>
        {deliveryPrice > 0 && (
          <li className="flex justify-between sm:text-sm">
            {t("Index.delivery")}
            <span>{deliveryPrice}TMT</span>
          </li>
        )}

        <li className="flex justify-between py-2.5 font-medium">
          {t("BucketPage.totalPrice")}
          <span className="rounded-[14px] border border-primary bg-onHover px-2.5 py-1 leading-4 sm:text-sm">
            {Number(totalPrice) + Number(deliveryPrice)} TMT
          </span>
        </li>
      </ul>

      <button
        type="submit"
        disabled={disabled}
        onSubmit={onSubmit}
        className="h-12 w-full rounded-[14px] bg-primary px-3 text-center font-medium leading-[48px] hover:bg-accent disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/50 sm:h-10 sm:leading-[40px]"
      >
        {t("BucketPage.submit")}
      </button>
    </div>
  );
};
export default Index;
