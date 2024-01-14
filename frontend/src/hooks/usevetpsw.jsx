export default function useVetPsw(password) {
  const has8chars = password.length >= 8
  const has1num = password.match(/[0-9]/g)
  const has1spec = password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)

  return { has8chars, has1num, has1spec }
}