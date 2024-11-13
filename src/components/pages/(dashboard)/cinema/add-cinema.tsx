'use client'
import { addCinema } from '@/actions/cinema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'

function AddCinemaForm({ children }: { children: React.ReactNode }) {
    const [state, action] = useFormState(addCinema, undefined)

    return (
        <form
            id="add-cinema"
            action={action}
            className="mt-4 flex flex-col gap-4"
        >
            <div className="flex flex-col gap-4">
                <Label
                    htmlFor={'name'}
                    key={'name'}
                    className="flex items-center gap-2"
                >
                    <span className="w-1/3 font-semibold text-black">Name</span>
                    <Input
                        id={'name'}
                        autoComplete="off"
                        name={'name'}
                        className="w-2/3 text-black"
                    />
                </Label>
                {state?.errors?.name && (
                    <div className="ml-auto text-sm text-red-500">
                        <ul>
                            {state?.errors?.name?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Label
                    htmlFor={'hotline'}
                    key={'hotline'}
                    className="flex items-center gap-2"
                >
                    <span className="w-1/3 font-semibold text-black">
                        Hotline
                    </span>
                    <Input
                        id={'hotline'}
                        autoComplete="off"
                        name={'hotline'}
                        className="w-2/3 text-black"
                    />
                </Label>
                {state?.errors?.hotline && (
                    <div className="ml-auto text-sm text-red-500">
                        <ul>
                            {state?.errors?.hotline?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Label
                    htmlFor={'address'}
                    key={'address'}
                    className="flex items-center gap-2"
                >
                    <span className="w-1/3 font-semibold text-black">
                        Address
                    </span>
                    <Input
                        id={'address'}
                        autoComplete="off"
                        name={'address'}
                        className="w-2/3 text-black"
                    />
                </Label>
                {state?.errors?.address && (
                    <div className="ml-auto text-sm text-red-500">
                        <ul>
                            {state?.errors?.address?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Label className="flex items-center">
                    <span className="w-1/3 font-semibold text-black">
                        Description
                    </span>
                    <Textarea
                        id="description"
                        name="description"
                        className="w-2/3 text-black"
                    />
                </Label>

                {state?.errors?.description && (
                    <div className="ml-auto text-sm text-red-500">
                        <ul>
                            {state?.errors?.description?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {children}
                {state?.errors?.location && (
                    <div className="text-sm text-red-500">
                        <ul>
                            {state?.errors?.location?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {state?.errors?.status && (
                    <div className="text-sm text-red-500">
                        <ul>
                            {state?.errors?.status?.map((error) => (
                                <li key={error}>- {error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <AddCinemaSubmit />
        </form>
    )
}

function AddCinemaSubmit() {
    const { pending } = useFormStatus()

    return (
        <Button disabled={pending} form="add-cinema" type="submit">
            Add Cinema
        </Button>
    )
}

export default AddCinemaForm
