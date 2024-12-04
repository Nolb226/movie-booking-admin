'use client'
import { loginAction } from '@/actions/common'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/lib/validations/common'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function LoginForm() {
    const [state, action] = useFormState(loginAction, undefined)
    const formRef = useRef<HTMLFormElement>(null)
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    useEffect(() => {
        form.reset({ ...(state?.fields ?? {}) })
    }, [state, form])

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={action}
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(() => {
                        action(new FormData(formRef.current!))
                    })(e)
                }}
            >
                <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormMessage>{state?.message}</FormMessage>
                <Button
                    disabled={form.formState.isSubmitSuccessful}
                    type="submit"
                    className="mt-4 w-full gap-2"
                >
                    {form.formState.isSubmitSuccessful && (
                        <LoaderCircle className="size-4 animate-spin" />
                    )}
                    Login
                </Button>
            </form>
        </Form>
    )
}
