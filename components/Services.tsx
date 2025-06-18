"use client";

import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "@/public/assets";
import { flowkoServices } from "@/lib/constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";
import Generating from "./Generating";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {useTranslations} from 'next-intl';

interface ServicesProps {
  className?: string;
}

function Services({ className }: ServicesProps) {
  const t = useTranslations('HomePage.services');
  
  return (
    <Section id="services" className={className}>
      <div className="container">
        <Heading
          title={t('title')}
          text={t('subtitle')}
        />

        <div className="relative">
          {/* Service 1: Client Management Automation */}
          <div
            className={cn(
              "relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]"
            )}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <Image
                className="w-full h-full object-cover md:object-right"
                width={800}
                height={730}
                alt="Client Management Automation"
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">{t('service1.title')}</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                {t('service1.description')}
              </p>
              <ul className="body-2">
                {t.raw('service1.features').map((item: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <Image width={24} height={24} src={check} alt="check" />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          <div className="relative z-1 grid gap-5 lg:grid-cols-2">
            {/* Service 2: Document & Billing Automation */}
            <div className="relative min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src={service2}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="Document and Billing Automation"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-n-8/0 to-n-8/90 lg:p-15">
                <h4 className="h4 mb-4">{t('service2.title')}</h4>
                <p className="body-2 mb-[3rem] text-n-3">
                  {t('service2.description')}
                </p>
                <div className="body-2 text-color-1 font-semibold">
                  {t('service2.problem')}
                </div>
              </div>

              <PhotoChatMessage />
            </div>

            {/* Service 3: Communication & Follow-up */}
            <div className="p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem]">
              <div className="py-12 px-4 xl:px-8">
                <h4 className="h4 mb-4">{t('service3.title')}</h4>
                <p className="body-2 mb-[2rem] text-n-3">
                  {t('service3.description')}
                </p>
                <div className="body-2 text-color-1 font-semibold mb-8">
                  {t('service3.benefit')}
                </div>

                <ul className="flex items-center justify-between">
                  {flowkoServices.map((item, index) => (
                    <li
                      key={index}
                      className="text-center max-w-[4rem]"
                    >
                      <div className="w-12 h-12 bg-n-6 rounded-xl flex items-center justify-center mb-2 mx-auto">
                        <Image width={24} height={24} src={check} alt="check" />
                      </div>
                      <p className="text-xs text-n-3">{item.split(' ')[0]}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-[20rem] bg-n-8 rounded-xl overflow-hidden md:h-[25rem]">
                <Image
                  src={service3}
                  className="w-full h-full object-cover"
                  width={520}
                  height={400}
                  alt="Communication Automation"
                />

                <VideoChatMessage />
                <VideoBar />
              </div>
            </div>
          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
}

export default Services;
