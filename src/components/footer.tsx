import ThemeToggle from './theme-toggle';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className='h-24 mt-10 w-full flex-none'>
            <div className='h-full max-w-7xl mx-auto flex justify-center'>
                <div className='w-full flex items-center justify-between mx-4 text-sm text-muted-text'>
                    <span className='mr-auto'>
                        Built by <Link href="https://github.com/jus1d" className='hover:text-primary-text transition-colors'>@ndbtea</Link>
                    </span>
                    <div className='flex gap-8'>
                        <ThemeToggle />
                        <Link href="https://github.com/voidcontests/frontend/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=" className='hover:text-primary-text transition-colors'>Bug Report</Link>
                        <Link href="https://github.com/voidcontests" className='hover:text-primary-text transition-colors'>GitHub</Link>
                        <Link href="mailto:artfa63@gmail.com" className='hover:text-primary-text transition-colors'>Email</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
