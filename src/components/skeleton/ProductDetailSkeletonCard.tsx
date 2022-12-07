import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductDetailSkeletonCard() {
  return (
    <section className="pt-24 pb-80">
      <section className="flex items-center w-full h-80 gap-36 pl-24 mt-24">
        <Skeleton width={"12rem"} height={"300px"} />
        <div className="w-2/4 flex flex-col gap-5">
          <Skeleton width={"12rem"} height={"20px"} />
          <Skeleton width={"12rem"} height={"20px"} />
          <Skeleton width={"12rem"} height={"20px"} />
          <Skeleton width={"12rem"} height={"20px"} />
          <Skeleton width={"12rem"} height={"20px"} />
        </div>
      </section>
    </section>
  );
}
