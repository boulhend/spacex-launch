import React, { PropsWithChildren } from 'react';

const Message = ({ children }: PropsWithChildren<{}>) => {
  return (
    <main className="bg-gray-50 w-screen h-screen flex justify-center items-center text-4xl font-bold">
      {children}
    </main>
  );
};

export default Message;
