import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tempArr = new Array(12).fill(0);

export default function ProductListSkeletonCard() {
  return (
    <>
      {/* <div className="pt-24"></div> */}
      <section className="w-3/4 mx-auto">
        <div className="grid w-max md:grid-cols-4 sm:grid-cols-2 gap-12 ">
          {tempArr.map((ele, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center"
            >
              <figure className="w-full h-80 flex items-center justify-center">
                <Skeleton width={"12rem"} height={"300px"} />
              </figure>
              <div className="">
                <p>
                  <Skeleton width={"12rem"} height={"30px"} />
                </p>
                <p>
                  <Skeleton width={"12rem"} height={"30px"} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
