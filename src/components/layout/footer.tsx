import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-16 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-1 flex flex-col gap-4 md:col-span-4 lg:col-span-2">
          <Link href="/">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="text-foreground/60">
            Elevate your career to royal standards. Find exclusive jobs, internships, and courses.
          </p>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" className="max-w-xs" />
            <Button>Subscribe</Button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold text-primary">Company</h3>
          <ul className="space-y-3">
            <li><Link href="/about" className="text-foreground/60 hover:text-primary">About Us</Link></li>
            <li><Link href="/careers" className="text-foreground/60 hover:text-primary">Careers</Link></li>
            <li><Link href="/press" className="text-foreground/60 hover:text-primary">Press</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold text-primary">Resources</h3>
          <ul className="space-y-3">
            <li><Link href="/blog" className="text-foreground/60 hover:text-primary">Blog</Link></li>
            <li><Link href="/contact" className="text-foreground/60 hover:text-primary">Contact Us</Link></li>
            <li><Link href="/faq" className="text-foreground/60 hover:text-primary">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold text-primary">Legal</h3>
          <ul className="space-y-3">
            <li><Link href="/terms" className="text-foreground/60 hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-foreground/60 hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} Royal Ascent Careers. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-foreground/60 hover:text-primary"><Twitter size={20} /></Link>
            <Link href="#" className="text-foreground/60 hover:text-primary"><Linkedin size={20} /></Link>
            <Link href="#" className="text-foreground/60 hover:text-primary"><Instagram size={20} /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
