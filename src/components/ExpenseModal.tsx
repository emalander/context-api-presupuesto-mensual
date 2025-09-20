import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import ExpenseForm from './ExpenseForm'

import { XMarkIcon } from '@heroicons/react/24/solid'

export default function ExpenseModal() {

  const { state, dispatch } = useBudget()

  return (
    <>
      <div className="w-full flex flex-row">
        <button
          type="button"
          onClick={() => dispatch({ type: 'show-modal' })}
        >
          <div className='bg-green-600 border border-white shadow-md w-full p-2 text-white uppercase font-bold rounded-lg flex items-center justify-center'> <PlusCircleIcon className="w-12 h-12 mr-4" />Agregar gasto</div>
        </button>
        <div className='mr-4'></div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'reset-app' })}
        >
          <div className='bg-sky-800 border border-white shadow-md w-full p-2 text-white uppercase font-bold rounded-lg flex items-center justify-center'> <XMarkIcon className="w-12 h-12 mr-4" />Resetear</div>
        </button>
      </div>

      <Transition appear show={state.modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({ type: 'close-modal' })}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ExpenseForm />


                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}