const Dashboard = (props) => {
  return (
    <div className="flex flex-wrap mt-6 -mx-3">
      <div className="w-full max-w-full px-3 flex-0 lg:w-10/12">
        <div className="relative flex flex-col min-w-0 break-words bg-chessBlack-300 border-0 border-solid dark:bg-gray-950 border-black-125 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
          <div className="p-4 pb-0 mb-0 rounded-t-4">
            <div className="flex justify-between">
              <h6 className="mb-2 dark:text-white text-2xl">
                Sales by Country
              </h6>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="items-center w-full mb-4 align-top border-gray-200 dark:border-white/40">
              <tbody>
                {props.data.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap dark:border-white/40">
                        <div className="flex items-center px-2 py-1">
                          <div>
                            <div className="text-lg">
                              {val.title}#{key}
                            </div>
                          </div>
                          <div className="ml-6">
                            <p className="mb-0 text-xs font-semibold leading-tight dark:opacity-60">
                              Country:
                            </p>
                            <h6 className="mb-0 text-sm leading-normal dark:text-white">
                              {val.country}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                        <div className="text-center">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:opacity-60">
                            Sales:
                          </p>
                          <h6 className="mb-0 text-sm leading-normal dark:text-white">
                            {val.sales}
                          </h6>
                        </div>
                      </td>
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                        <div className="text-center">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:opacity-60">
                            Value:
                          </p>
                          <h6 className="mb-0 text-sm leading-normal dark:text-white">
                            {val.value}
                          </h6>
                        </div>
                      </td>
                      <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap dark:border-white/40">
                        <div className="flex-1 text-center">
                          <p className="mb-0 text-xs font-semibold leading-tight dark:opacity-60">
                            Bounce:
                          </p>
                          <h6 className="mb-0 text-sm leading-normal dark:text-white">
                            {val.bounce}
                          </h6>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
