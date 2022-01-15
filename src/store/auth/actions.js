import { useRouter } from "vue-router";
export function logout () {
  const router = useRouter()
  localStorage.clear()
  router.push({path: 'login'})
}
