export const JhFetchError = ({ message }: { message: string }) => {
  return (
    <div className="bg-secondary-200 text-xl font-medium min-h-20 border text-center place-content-center my-10">
      <div>{message}</div>
    </div>
  );
};
