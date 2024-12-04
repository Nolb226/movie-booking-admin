import Logo from '@/components/logo'
import LoginForm from '@/components/pages/(auth)/login-form'

export default function Page() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black to-primary-850">
            <div className="min-h-fit w-full max-w-[510px] items-center justify-center min-[920px]:ml-[300px] xl:ml-0">
                <Logo className="mx-auto" />
                <h1 className="mt-4 text-center text-2xl font-bold">
                    Sign in to your account
                </h1>
                <LoginForm />
            </div>
        </main>
    )
}
