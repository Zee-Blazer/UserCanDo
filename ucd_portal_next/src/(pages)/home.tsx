"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import HomeIntroSection from "@/components/Home/intro-section";
import ProjectSection from "@/components/Home/projects-section";
import OurServiceSection from "@/components/Home/our-service-section";
import VisionSection from "@/components/Home/vision-section";
import ArticleSection from "@/components/Home/article-section";
import ScheduleAppointmentSection from "@/components/Home/schedule-appointment-section";
import FooterSection from "@/components/Home/footer-section";

export default function Home() {
	const [value, setValue] = useState<string | undefined>();

	return (
		<main className='pb-6'>
			<HomeIntroSection />
			<ProjectSection />
			<OurServiceSection />
			<div className='zoom-fix-container'>
				<VisionSection />
				{/* <ArticleSection /> */}
				<ScheduleAppointmentSection />
			</div>
			<FooterSection />
		</main>
	);
}
