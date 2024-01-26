import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid"; // Menggunakan XMarkIcon untuk ikon "X"
import LoadingButton from "./LoadingButton";
// import LoadingButton from "./LoadingButton";

export default function ModalDetail({
  title = "",
  open = false,
  setOpen,
  onSubmit,
  action = "add",
  isLoading = false,
  //   statusSubmit,
  setStatusSubmit,
  children,
}) {
  const cancelButtonRef = useRef(null);
  //   const [statusSubmit, setStatusSubmit] = useState("");

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-visible 
              rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all 
              sm:my-8 sm:w-full sm:max-w-4xl sm:p-6"
              >
                <div className="absolute top-0 right-0 mt-2 mr-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
                  >
                    <XMarkIcon className="w-6 h-6" />{" "}
                    {/* Gunakan ikon "X" di sudut kanan atas */}
                  </button>
                </div>
                <form onSubmit={onSubmit}>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {action[0].toUpperCase() + action.substring(1)} {title}
                      </Dialog.Title>
                      <div className="text-left mt-4">{children}</div>
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
