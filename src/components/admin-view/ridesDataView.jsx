import { Divider } from "@mui/material";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

function AdminRideDataView({
  rides,
  setFormData,
  setOpenAddRides,
  setCurrentEditedId,
  //   handleDelete,
}) {
  const [isfetched, setIsFetched] = useState(true);
  return (
    <Card className="">
      <div className="flex-col items-center w-72  h-[380px] ">
        {isfetched ? (
          <>
            <div className="flex justify-center items-center mb-2 ">
              <img
                src={rides?.imageUrl}
                alt={rides?.ride}
                className="h-52 rounded-md"
              />
            </div>
            <Divider />
            <CardContent className="px-4">
              <h2 className="text-xl font-bold mb-2 mt-2">{rides?.ride}</h2>
              <div className="flex justify-between items-center mb-2 ">
                <span
                  className={`${
                    rides?.rent > 0 ? "" : "line-through"
                  } text-md font-medium `}
                >
                  Stock : {rides?.totalStock}
                </span>
                {rides?.rent > 0 ? (
                  <span className="text-md font-medium ">
                    Rent {rides?.rent} Rs
                  </span>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center px-4">
              <Button
                onClick={() => {
                  setOpenAddRides(true);
                  setCurrentEditedId(rides?._id);
                  setFormData(rides);
                }}
              >
                Edit
              </Button>
              <Button
              //   onClick={() => handleDelete(rides?._id)}
              >
                Delete
              </Button>
            </CardFooter>
          </>
        ) : (
          <Skeleton className="h-[368px] m-3 bg-gray-100" />
        )}
      </div>
    </Card>
  );
}

export default AdminRideDataView;
