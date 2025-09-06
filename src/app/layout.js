import StoreProvider from "./StoreProvider";
import QueryProvider from "./QueryProvider";

export const metadata = {
    title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    <QueryProvider>
                        {children}
                    </QueryProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
