import { Loader } from "../../Components/Loader"

export const SkeletonSingle: React.FC = (): JSX.Element => {
  return(
    <section className="Skeleton">

      <div className="Skeleton__body">
        <div>
          <Loader />
        </div>
      </div>
    </section>
  )
}