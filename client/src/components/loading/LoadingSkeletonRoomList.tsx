export default function LoadingSkeletonRoomList() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="w-full p-4 border-b animate-pulse">
          <div className="relative flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full border bg-gray-300"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-3 w-16 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}
