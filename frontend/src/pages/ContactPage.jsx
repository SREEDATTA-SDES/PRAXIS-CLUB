import React, { useState } from 'react';
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
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Header */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-4">
        <span className="text-xs uppercase font-bold tracking-[0.35em] text-praxis-cyan">
          Institutional Channels
        </span>
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-display tracking-wider">
          CONTACT & LOCATION
        </h1>
        <p className="text-xs sm:text-sm text-praxis-secondary max-w-2xl mx-auto leading-relaxed">
          Connect with the faculty leadership, student chapter heads, or visit our department campus at Sheriguda, Greater Hyderabad.
        </p>
      </section>

      {/* Main Grid: Details + Message Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Campus Address & Official Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-2xl glass-panel-elevated border border-praxis-border space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-praxis-cyan block mb-1">
                  SDES Campus
                </span>
                <h3 className="text-xl font-bold uppercase text-white font-display">
                  {settings.collegeName}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-praxis-secondary">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-praxis-accent shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{settings.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-praxis-cyan shrink-0" />
                  <a href={`mailto:${settings.officialEmail}`} className="hover:text-white transition-colors">
                    {settings.officialEmail}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-emerald-400 shrink-0" />
                  <a href={`tel:${settings.officialPhone}`} className="hover:text-white transition-colors">
                    {settings.officialPhone}
                  </a>
                </div>
              </div>

              {/* Social Channels (Instagram, Facebook, WhatsApp - NO LinkedIn) */}
              <div className="pt-4 border-t border-praxis-border/60">
                <span className="text-[10px] uppercase tracking-widest text-praxis-muted block mb-3 font-semibold">
                  Official Social Handles
                </span>
                <div className="flex items-center gap-3">
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-praxis-card border border-praxis-border text-xs text-praxis-secondary hover:text-praxis-accent hover:border-praxis-accent/50 transition-all"
                    >
                      <InstagramIcon size={14} />
                      <span>Instagram</span>
                    </a>
                  )}
                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-praxis-card border border-praxis-border text-xs text-praxis-secondary hover:text-praxis-cyan hover:border-praxis-cyan/50 transition-all"
                    >
                      <FacebookIcon size={14} />
                      <span>Facebook</span>
                    </a>
                  )}
                  {settings.whatsappUrl && (
                    <a
                      href={settings.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-praxis-card border border-praxis-border text-xs text-praxis-secondary hover:text-emerald-400 hover:border-emerald-400/50 transition-all"
                    >
                      <WhatsAppIcon size={14} />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Link to College Website */}
            <div className="p-6 rounded-2xl glass-panel border border-praxis-border flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white uppercase">Main College Portal</h4>
                <p className="text-xs text-praxis-muted">Visit official SDES administrative site</p>
              </div>
              <a
                href={settings.collegeWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-praxis-elevated text-praxis-cyan hover:bg-praxis-cyan hover:text-praxis-bg transition-all"
              >
                <ExternalLink size={16} />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Message / Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl glass-panel border border-praxis-border space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-[0.25em] text-praxis-cyan block mb-1">
                  Direct Inquiries
                </span>
                <h3 className="text-2xl font-bold uppercase text-white font-display">
                  Send a Message to PRAXIS
                </h3>
                <p className="text-xs text-praxis-secondary mt-1">
                  Have an event proposal, club collaboration idea, or question? Send us a message.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 size={36} className="text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white uppercase font-display">Message Dispatched</h4>
                  <p className="text-xs text-emerald-200">
                    Thank you for reaching out. The department coordinators will review your note shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-praxis-secondary font-semibold mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g., Alex Johnson"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-praxis-secondary font-semibold mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="student@sreedattha.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block uppercase tracking-wider text-praxis-secondary font-semibold mb-1.5">
                        Department / Branch
                      </label>
                      <input
                        type="text"
                        value={formState.department}
                        onChange={(e) => setFormState({ ...formState, department: e.target.value })}
                        placeholder="CSE-Allied / AI / DS"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-praxis-secondary font-semibold mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Event query / Sponsorship"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-praxis-secondary font-semibold mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-praxis-card border border-praxis-border text-white placeholder-praxis-muted focus:outline-none focus:border-praxis-cyan text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-praxis-glow to-blue-600 hover:from-blue-600 hover:to-praxis-cyan text-white uppercase font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-cinematic-blue"
                  >
                    <span>SEND MESSAGE</span>
                    <Send size={14} />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Google Maps Embed / Interactive Location Representation */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-2 rounded-2xl glass-panel border border-praxis-border overflow-hidden">
          <div className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden bg-praxis-card">
            <iframe
              title="SDES Campus Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3810.076639869502!2d78.58611847516147!3d17.214470883645366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba00b73b5f001%3A0xa9ffbb1c7201c7a8!2sSree%20Dattha%20Institute%20of%20Engineering%20and%20Science!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

    </div>
  );
};
