import { Link } from 'react-router-dom'


export default function About() {
 

  return (
    <div className="bg-white">
      

      <div className="relative isolate px-6 pt-14 lg:px-8">
       
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-30">
          
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            About Events App
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                Get started
              </Link>
             
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
                     />
        </div>
      </div>
    </div>
  )
}
