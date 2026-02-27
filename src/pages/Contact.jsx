import React from 'react'
import { Contact } from '../components/Contact'
import Header from '../components/header'
import { Footer } from '../components/Footer'
import SEO from '../components/SEO'

const ContactPage = () => {
    return (
        <div>
            <SEO
                title="Contact Us"
                description="Get in touch with Billford Advertising for your next big project. We offer customized advertising solutions to meet your business needs."
                keywords="contact us, advertise with us, advertising inquiry, business consultation"
                ogType="website"
            />
            <Header />
            <Contact />
            <Footer />
        </div>
    )
}

export default ContactPage