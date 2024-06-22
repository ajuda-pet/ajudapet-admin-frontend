let url = 'https://ajudapet-backend.onrender.com'

if (window.location.href.includes('staging') || window.location.href.includes('localhost')) {
    url = 'https://staging-ajudapet-backend.onrender.com'
}

export const baseApi = url
