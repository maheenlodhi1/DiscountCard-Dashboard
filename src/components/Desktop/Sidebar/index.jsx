import { classNames } from "@/utils/generics";
import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DesktopSidebar({ navigation }) {
  const router = useRouter();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-24 shrink-0 items-center">
          <Link href={"/app"} className="inline-block mx-auto">
            <Image
              width={1100}
              height={1100}
              className="h-20 w-auto mx-auto"
              src={"/kafu-logo.png"}
              priority
              alt="Kafu Logo"
            />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        href={`/app/${item.href}`}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-primary"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-primary"
                              : "text-gray-400 group-hover:text-primary",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ) : (
                      router?.pathname && (
                        <Disclosure
                          defaultOpen={item.children.some((child) =>
                            child.href.startsWith(router.pathname)
                          )}
                          as="div"
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current
                                    ? "bg-gray-50 text-primary"
                                    : "hover:bg-gray-50 text-gray-700",
                                  "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6  "
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-primary"
                                      : "text-gray-400 group-hover:text-primary",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                                <ChevronRightIcon
                                  className={classNames(
                                    open
                                      ? "rotate-90 text-gray-500"
                                      : "text-gray-400",
                                    "ml-auto h-5 w-5 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>

                              <Disclosure.Panel
                                as="ul"
                                className="mt-1 space-y-1 pl-2"
                              >
                                {item.children.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link
                                      href={subItem.href}
                                      className={classNames(
                                        subItem.current
                                          ? "bg-gray-50 text-primary"
                                          : "hover:bg-gray-50 text-gray-700 ",
                                        " block rounded-md py-2 pr-2 pl-9 text-sm leading-6 "
                                      )}
                                    >
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    )}
                  </li>
                ))}
              </ul>
            </li>

            <li className="mt-auto">
              <Link
                href={`/app/settings`}
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary"
              >
                <Cog6ToothIcon
                  className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"
                  aria-hidden="true"
                />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
