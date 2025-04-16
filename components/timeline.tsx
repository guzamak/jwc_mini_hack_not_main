import React from "react";

export default function Timeline() {
  return (
  <section id="timeline" className="py-20 bg-gradient-to-t from-white to-gray-50">
        <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Event Timeline
            </h2>
            <div className="max-w-4xl mx-auto">
                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>
                    
                    <div className="relative mb-12">
                        <div className="flex items-center">
                            <div className="w-1/2 pr-8 text-right">
                                <h3 className="font-bold text-xl">Registration Opens</h3>
                                <p className="text-gray-600">January 15, 2025</p>
                            </div>
                            <div className="w-4 h-4 bg-gray-900 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                            <div className="w-1/2 pl-8"></div>
                        </div>
                    </div>

                    <div className="relative mb-12">
                        <div className="flex items-center">
                            <div className="w-1/2 pr-8"></div>
                            <div className="w-4 h-4 bg-gray-900 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                            <div className="w-1/2 pl-8">
                                <h3 className="font-bold text-xl">Opening Ceremony</h3>
                                <p className="text-gray-600">March 1, 2025</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative mb-12">
                        <div className="flex items-center bg-red-50">
                            <div className="w-1/2 pr-8 text-right">
                            <div className="border-2 border-gray-200 rounded-3xl hover:bg-gray-100 duration-200">
                                <h3 className="font-bold text-xl">Hacking Begins</h3>
                                <p className="text-gray-600">March 2, 2025</p>
                            </div>
                            </div>
                            <div className="w-4 h-4 bg-gray-900 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                            <div className="w-1/2 pl-8"></div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex items-center  border-gray-200 rounded-3xl hover:bg-gray-100 duration-200">
                            <div className="w-1/2 pr-8"></div>
                            <div className="w-4 h-4 bg-gray-900 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                            <div className="w-1/2 pl-8">
                                <h3 className="font-bold text-xl">Final Presentation</h3>
                                <p className="text-gray-600">March 4, 2025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
