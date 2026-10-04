import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Mail, Phone, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons';
import { useData } from '../context/DataContext';

export const ContactPage = () => {
  const { settings, showToast } = useData();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    department: 'CSE-Allied',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setSubmitted(true);
    showToast('Your message has been received by the PRAXIS coordination committee.');
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        email: '',
        department: 'CSE-Allied',
        subject: '',
        message: ''
      });
    }, 4000);
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-transparent pt-36 sm:pt-40 md:pt-48 pb-24 overflow-hidden">
      
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-praxis-bg/80 backdrop-blur-3xl" />
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-20 bg-praxis-cyan/40"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] mix-blend-screen opacity-20 bg-praxis-accent/40"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Page Header */}
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center space-y-4 max-w-4xl mx-auto pt-2 pb-8"
        >
          <span className="text-[10px] md:text-xs uppercase font-bold tracking-[0.5em] text-praxis-cyan font-cinematic block">
            Official Nexus
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 font-display tracking-widest">
            Contact & Connect
          </h1>
          <p className="text-xs md:text-sm text-white/50 leading-relaxed font-cinematic uppercase tracking-widest max-w-xl mx-auto">
            Get in touch with the PRAXIS coordination committee or visit our campus at Sheriguda.
          </p>
        </motion.div>


        {/* Main Grid: Details + Message Form */}
        <section className="relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Campus Address & Official Channels */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 space-y-8"
            >
              
              <div className="liquid-glass-elevated p-12 rounded-[2.5rem] border-white/20 space-y-10">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan block mb-2">
                    SDES Campus
                  </span>
                  <h3 className="text-3xl font-black uppercase text-white font-display tracking-wider">
                    {settings.collegeName}
                  </h3>
                </div>

                <div className="space-y-6 text-sm text-white/70 font-cinematic tracking-widest leading-loose">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-praxis-accent shrink-0 mt-1" />
                    <span>{settings.address}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail size={20} className="text-praxis-cyan shrink-0" />
                    <a href={`mailto:${settings.officialEmail}`} className="hover:text-white transition-colors">
                      {settings.officialEmail}
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone size={20} className="text-emerald-400 shrink-0" />
                    <a href={`tel:${settings.officialPhone}`} className="hover:text-white transition-colors">
                      {settings.officialPhone}
                    </a>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-8 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 block mb-6">
                    Official Social Handles
                  </span>
                  <div className="flex items-center gap-4">
                    {settings.instagramUrl && (
                      <a
                        href={settings.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-4 liquid-glass rounded-full text-[10px] uppercase font-bold tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                      >
                        <InstagramIcon size={16} />
                        <span className="hidden sm:inline">Instagram</span>
                      </a>
                    )}
                    {settings.facebookUrl && (
                      <a
                        href={settings.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-4 liquid-glass rounded-full text-[10px] uppercase font-bold tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                      >
                        <FacebookIcon size={16} />
                        <span className="hidden sm:inline">Facebook</span>
                      </a>
                    )}
                    {settings.whatsappUrl && (
                      <a
                        href={settings.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-6 py-4 liquid-glass rounded-full text-[10px] uppercase font-bold tracking-widest text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                      >
                        <WhatsAppIcon size={16} />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Link to College Website */}
              <div className="liquid-glass p-8 rounded-[2.5rem] border border-white/10 flex items-center justify-between group">
                <div>
                  <h4 className="text-lg font-black text-white font-display uppercase tracking-widest">Main Portal</h4>
                  <p className="text-xs text-white/50 font-cinematic uppercase tracking-widest">Visit official SDES administrative site</p>
                </div>
                <a
                  href={settings.collegeWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-praxis-cyan text-praxis-cyan flex items-center justify-center group-hover:bg-praxis-cyan group-hover:text-praxis-bg transition-colors duration-300"
                >
                  <ExternalLink size={20} />
                </a>
              </div>

            </motion.div>

            {/* Right Column: Interactive Message / Inquiry Form */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="liquid-glass-elevated p-12 md:p-16 rounded-[3rem] border border-white/20 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-praxis-cyan/10 to-transparent blur-3xl pointer-events-none" />
                
                <div className="mb-12">
                  <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan block mb-2">
                    Direct Inquiries
                  </span>
                  <h3 className="text-4xl font-black uppercase text-white font-display tracking-widest">
                    Dispatch Message
                  </h3>
                  <p className="text-sm text-white/50 mt-4 font-cinematic tracking-widest leading-relaxed">
                    Have an event proposal, club collaboration idea, or question? Securely transmit your message to the PRAXIS coordination committee.
                  </p>
                </div>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 rounded-[2rem] bg-emerald-950/40 border border-emerald-500/40 text-center space-y-6"
                  >
                    <CheckCircle2 size={64} className="text-emerald-400 mx-auto" />
                    <div>
                      <h4 className="text-2xl font-black text-white uppercase font-display tracking-widest">Transmission Successful</h4>
                      <p className="text-sm text-emerald-200/70 mt-4 font-cinematic tracking-widest leading-loose">
                        Thank you for reaching out. The department coordinators will review your transmission shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-6 py-4 rounded-full liquid-glass border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-praxis-cyan transition-colors bg-transparent"
                          placeholder="e.g., Alex Johnson"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-6 py-4 rounded-full liquid-glass border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-praxis-cyan transition-colors bg-transparent"
                          placeholder="student@sreedattha.ac.in"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                          Department / Branch
                        </label>
                        <input
                          type="text"
                          value={formState.department}
                          onChange={(e) => setFormState({ ...formState, department: e.target.value })}
                          className="w-full px-6 py-4 rounded-full liquid-glass border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-praxis-cyan transition-colors bg-transparent"
                          placeholder="CSE-Allied / AI / DS"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          className="w-full px-6 py-4 rounded-full liquid-glass border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-praxis-cyan transition-colors bg-transparent"
                          placeholder="Event query / Sponsorship"
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-4">
                      <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">
                        Message Payload *
                      </label>
                      <textarea
                        rows={6}
                        required
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-6 py-6 rounded-[2rem] liquid-glass border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-praxis-cyan transition-colors bg-transparent resize-none"
                        placeholder="Transmit your message content here..."
                      />
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        className="w-full py-5 rounded-full liquid-glass border border-praxis-cyan bg-praxis-cyan/10 hover:bg-praxis-cyan/30 text-white uppercase font-bold tracking-[0.3em] transition-all flex items-center justify-center gap-4 text-xs"
                      >
                        <span>INITIATE TRANSMISSION</span>
                        <Send size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </section>

        {/* Google Maps Embed / Sheriguda Campus Location */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-20 pt-8"
        >
          <div className="p-4 sm:p-6 rounded-[3rem] liquid-glass-elevated border border-white/20 overflow-hidden space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 pt-2 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-praxis-cyan block mb-1">
                  Location Matrix &bull; Sheriguda Campus
                </span>
                <h4 className="text-xl sm:text-2xl font-black uppercase text-white font-display tracking-wider">
                  Campus Navigation Map
                </h4>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sree+Dattha+Institute+of+Engineering+and+Science+Sheriguda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass border border-praxis-cyan/40 text-praxis-cyan hover:bg-praxis-cyan hover:text-praxis-bg text-xs font-bold uppercase tracking-widest transition-all duration-300"
              >
                <span>Navigate in Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="relative h-[400px] md:h-[550px] w-full rounded-[2.5rem] overflow-hidden bg-black border border-white/10">
              <iframe
                title="SDES Campus Google Map - Sheriguda"
                src="https://maps.google.com/maps?q=Sree+Dattha+Institute+of+Engineering+and+Science,+Sheriguda,+Ibrahimpatnam&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%) opacity(0.85)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-praxis-cyan/10 mix-blend-color pointer-events-none" />
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};
