import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-20 w-auto"
          width={1100}
          height={1100}
          src="/kafu-logo.png"
          alt="Your Company"
        />
      </div>

      <div className="mt-10 space-y-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {children}
      </div>
    </div>
  );
}
