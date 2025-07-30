import StoreProvider from "./StoreProvider";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>
                    {children}
                </StoreProvider>
            </body>
        </html>
    );
}
