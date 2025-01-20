import { Link, NavLink } from 'react-router-dom';
import feltonlogo from '../../assets/img/feltonlogo.png'; // Asegúrate que la ruta sea correcta
import loadingimg from '../../assets/img/loading.gif';
import { useState, Fragment } from 'react';
import DotLoader from "react-spinners/DotLoader";
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { connect } from 'react-redux';

const solutions = [
    {
        name: 'Casos',
        description: 'Medir las acciones que realizan tus usuarios',
        href: '/casos',
        icon: IconThree, // Usamos IconThree aquí
    },
    {
        name: 'Servicios',
        description: 'Crea tu propio contenido enfocado',
        href: '/servicios',
        icon: IconThree, // Usamos IconThree aquí
    },
    {
        name: 'Nosotros',
        description: 'Conoce más sobre nosotros',
        href: '/nosotros',
        icon: IconThree, // Usamos IconThree aquí
    },
    {
        name: 'Carreras',
        description: 'Explora oportunidades profesionales',
        href: '/carreras',
        icon: IconThree, // Usamos IconThree aquí
    },
    {
        name: 'Blog',
        description: 'Lee nuestros artículos',
        href: '/blog',
        icon: IconThree, // Usamos IconThree aquí
    },
    {
        name: 'Contacto',
        description: 'Contáctanos para más información',
        href: '/contacto',
        icon: IconThree, // Usamos IconThree aquí
    },
];

function Navbar() {
    const [loading, setLoading] = useState(true);

    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.getElementById("navbar")) {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                document.getElementById("navbar").classList.add('shadow-navbar');
                document.getElementById("navbar").classList.add('bg-white');
            } else {
                document.getElementById("navbar").classList.remove('shadow-navbar');
                document.getElementById("navbar").classList.remove('bg-white');
            }
        }
    }

    return (
        <nav id='navbar' className='w-full py-2 top transition duration-300 ease-in-out z-40 fixed'>
            <div className="px-4 sm:px-6">
                <div className="-ml-4 -mt-2 hidden lg:flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
                    <Link to='/' className="ml-4 mt-2">
                        <img
                            src={feltonlogo}
                            width={80}
                            height={80}
                            className=""
                        />
                    </Link>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <NavLink to='/casos' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4">Casos</NavLink>
                        <NavLink to='/servicios' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4">Servicios</NavLink>
                        <NavLink to='/nosotros' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4">Nosotros</NavLink>
                        <NavLink to='/carreras' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4">Carreras</NavLink>
                        <NavLink to='/blog' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4">Blog</NavLink>
                        <NavLink to='/contacto' className="text-lg inline-flex font-medium leading-6 text-gray-900 border-b-2 border-white hover:border-orange-500 transition duration-300 ease-in-out mx-4">Contacto</NavLink>

                        <Link
                            to="/contacto"
                            className="inline-flex ml-12 items-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            Hire Us
                            <DotLoader className="ml-3 -mr-1 h-5 w-5" loading={loading} size={20} color="#f2f2f2" />
                        </Link>
                    </div>
                </div>

                <div className="-ml-4 -mt-2 lg:hidden flex flex-wrap items-center justify-between sm:flex-nowrap md:px-14 px-2">
                    <Link to='/' className="ml-4 mt-2">
                        <img
                            src={feltonlogo}
                            width={60}
                            height={60}
                            className=""
                        />
                    </Link>
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={`
                                            ${open ? 'text-opacity-100' : 'text-opacity-90'}
                                            focus:ring-none focus:outline-none`}
                                    >
                                        {
                                            open ?
                                                <i className='bx bx-x text-4xl'></i> :
                                                <i className='bx bx-menu text-4xl'></i>
                                        }
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute -left-32 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                                                    {solutions.map((item) => (
                                                        <Link
                                                            key={item.name}
                                                            to={item.href}
                                                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                                                                <item.icon className="h-6 w-6" /> {/* Icono actualizado */}
                                                            </div>
                                                            <div className="ml-4">
                                                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                                                <p className="text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

function IconThree() {
    return (
        <svg
            width="50"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5" />
            <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
            <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
            <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
            <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
            <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
            <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
        </svg>
    );
}
