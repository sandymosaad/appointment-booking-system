import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@mui/material";

import Card from "./_components/Card/Card";
import Service from "./_components/Service/Service"
import ServiceCard from "./_components/ServiceCard/ServiceCard";

import Link from "next/link";

import {keyFeatures,
  serviceProviders,
  serviceProvidersCards,
  serviceClients,
  serviceClientsCards,
  stepsToWork } from "./_staticData/landingPageData"


export default function Home() {


  return <>
      <div className={styles.heroSection}>
        <h1>Simplify Your Appointment<br/> Booking</h1>
        <p>A powerful platform connecting service providers with clients. Book <br/> appointments in seconds, manage your schedule effortlessly.</p>
        <div className={styles.buttons}>
            <Link href="/login">
                <Button variant="outlined" sx={{ fontSize: 18 }}>Login to Dashboard</Button>   
            </Link>
            <Link href="/signup">
                <Button variant="contained"  sx={{ fontSize: 18 }}>Sign Up Free</Button>
            </Link>      
        </div>
      </div>

      <div className={styles.featuresSection}> 
        <h2>Key Features</h2>
        <div className={styles.cards}>
          {keyFeatures.map((feature) => (
          <Card key={feature.title} cardData={feature} />
          ))}
        </div>
      </div>

      <div className={styles.serviceSection}>
          <h2>For Service Providers</h2>
          <div className={styles.services}>
            
            <div className={styles.servicesData}>
              {serviceProviders.map((service)=>(
              <Service key={service.title} serviceData={service} />
              ))}             

            <Link href="/login">
              <Button variant="contained" sx={{ fontSize: 18, ml: 2 }}>
                Start as Provider
              </Button>
            </Link>
            </div>
            <div className={styles.servicesCard}>
            {serviceProvidersCards.map((card)=>(
              <ServiceCard key={card.title} serviceData={card}/>
            ))}
            </div>
          </div>  
      </div>


      <div className={styles.serviceSection}>
        <h2>For Clients</h2>
          <div className={styles.services}>
            <div className={styles.servicesCard}>
            {serviceClientsCards.map((card)=>(
              <ServiceCard key={card.title} serviceData={card}/>
            ))}
            </div>
            <div className={styles.servicesData}>
              {serviceClients.map((service)=>(
              <Service key={service.title} serviceData={service} />
              ))}             

            <Link href="/login">
              <Button variant="contained" sx={{ fontSize: 18, ml: 2 }}>
                Start as Client
              </Button>
            </Link>
            </div>

          </div>  
      </div>


      <div className={styles.stepsToWorkSection}>
              <h2>How It Works</h2>
              <div className={styles.cards}>
              {stepsToWork.map((feature) => (
                <Card key={feature.title} cardData={feature} stepsToWork={true} />
              ))}
              </div>
      </div>

      
      <div className={styles.readyToStartSection}>
          <h3>Ready to Get Started?</h3>
          <p >Join thousands of providers and clients managing appointments efficiently</p>
          <div className={styles.buttons}>
            <Link href="/signup">
              <Button variant="contained" sx={{ fontSize: 18, ml: 2 }}>
                Create Free Account
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="contained" sx={{ fontSize: 18, ml: 2 }}>
                Login
              </Button>
            </Link>
          </div>
      </div>

  </>;
}
