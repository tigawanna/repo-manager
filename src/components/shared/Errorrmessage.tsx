interface ErrorrmessageProps {
  error_message: string;
}

export function ErrorrMessageComponent({ error_message }: ErrorrmessageProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center rounded-lg gap-2 m-1 p-1">
      <p className="text-xs bg-red-850 text-red-200 py-1 px-3 border-red-300 border rounded-lg">
        {error_message}
      </p>
    </div>
  );
}
