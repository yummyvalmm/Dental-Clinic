import BookingWizard from '../components/features/BookingWizard';

const BookingPage = () => {
    return (
        <div className="pt-24 pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pt-32 lg:pb-12 min-h-[100dvh] w-full flex items-center justify-center bg-bg-body px-6 overflow-x-hidden">
            <BookingWizard />
        </div>
    );
};

export default BookingPage;
