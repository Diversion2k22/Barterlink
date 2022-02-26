import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '067ft4sh',
  dataset: 'production',
  apiVersion: '2022-02-25',
  useCdn: false,
  token:
    'skKPHghkig97aymBZPneNzJGk0LIOi4chFHPRs5gqriCmVlofl4OPU8YpmXMa4IKXBUA5l7fPOR007WZrCCS5y55moWDh68risbECqQVsb8v4rgTLm1XOvk6fdSVkX6d9P7Ymbydx4MLlW1cwatCaLBPsYSZ86PFdvpdMb6DBgX8dk2Qfmm4',
})
