import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tempArr = new Array(3).fill(0);

export default function CartSkeletonCard() {
  return (
    <section className="pt-24">
      <section className="flex w-3/4 gap-36 pl-24 mt-24">
        <ul>
          {tempArr.map((ele, idx) => (
            <li key={idx + 1}>
              <div className="flex items-center gap-24">
                <Skeleton className="w-56 h-80 flex items-center justify-center" />
                <div className="flex flex-col gap-5">
                  {/* <p>total: {getTotalQuantity()} </p> */}
                  <Skeleton width={"24rem"} height={"100px"} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
