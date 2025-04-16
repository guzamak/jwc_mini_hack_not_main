import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/data";
import { MessageCircleQuestion } from "lucide-react";

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white font-IBM-Plex my-3">
      <div className="container mx-auto px-6">
        <div className="flex justify-center items-center gap-4 mb-16">
          <MessageCircleQuestion className="w-8 h-8 text-gray-300 my-2"/>
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent font-Playfair-Display italic">
            FAQ
          </h2>
        </div>
        <Accordion type="single" collapsible className=" mx-auto space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg bg-white"
            >
              <AccordionTrigger className="w-full px-6 py-4 text-left focus:outline-none hover:no-underline cursor-pointer">
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-gray-800 text-lg">
                    {item.qus}
                  </span>
                  {/* <ChevronDownIcon className="w-5 h-5 transition-transform duration-300 accordion-open:rotate-180 text-gray-500" /> */}
                </div>
              </AccordionTrigger>
              <AccordionContent className="mt-4 px-6 pb-4 text-gray-600">
                {item.ans}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
