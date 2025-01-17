'use client'
import { useSelector } from 'react-redux'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { RootState } from '@/app/this/store/reducers'

export default function CompanyGuard({
    urlCompanyId
}: {
    urlCompanyId: string
}) {
    const companyId = useSelector((state: RootState) => state.auth.companyId)

    useEffect(() => {
        if (!urlCompanyId || urlCompanyId !== companyId) {
            redirect('/error-403')
        }
    }, [urlCompanyId, companyId])

    return null
}