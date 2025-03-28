<template>
  <div class="w-full h-48 header-image">
    <div class="w-full h-full header-text">Test de Emprendedores</div>
  </div>
  <section
    class="flex flex-col justify-center items-center gap-4 first-section"
  >
    <div class="wellcome-text">
      ¡Bienvenido/a al test para emprendedores en Argentina!
    </div>
    <div class="wellcome-wrapper">
      <div class="flex flex-col justify-center items-center participa">
        <img src="/src/assets/icono_participa.svg" alt="icono" />
        <span>Participá</span>
        <span class="participa-first-text"
          >En pocos minutos, podrás identificar fortalezas y áreas de mejora
          para tu emprendimiento o proyecto.
        </span>
      </div>
      <div class="flex flex-col justify-center items-center participa">
        <img src="/src/assets/icono_desarrollo.svg" alt="icono" />
        <span>Impulsá tu desarrollo</span>
        <span class="participa-second-text"
          >Al completarlo, recibirás recomendaciones para ayudarte a
          crecer.</span
        >
      </div>
    </div>
    <div class="mt-4 flex justify-center items-center banner">
      Sumá los puntos de tus respuestas y descubrí tu nivel de preparación
    </div>
  </section>

  <section class="form-wrapper">
    <p class="first-text mt-4 mb-4">
      Te pedimos tus datos para recibir información de utilidad y tener la
      posibilidad de contactarte:
    </p>
    <div class="flex justify-start items-center mb-4 second-text">
      <div class="w-8 bg-transparent text-transparent" style="height: 100%">
        <div class="bg-amber-400 h-30" style="border-radius: 8px 0 0 8px">
          .
        </div>
      </div>
      <div class="p-2">
        Las respuestas que nos brinde quedan resguardadas por secreto
        estadístico (Ley 17.622), esto significa que sus respuestas no podrán
        ser individualizadas.
      </div>
    </div>

    <div class="form-fields">
      <Form
        v-slot="$form"
        class="flex flex-col items-center justify-center p-4 gap-4 form-style"
        :validateOnValueUpdate="false"
        :resolver
        :initialValues
        @submit="handleLogin"
      >
        <InputText
          class="w-full"
          name="username"
          label="Nombre y Apellido"
          :errorMsg="$form.username?.error?.message"
        />
        <InputText
          class="w-full"
          name="email"
          label="Correo Electrónico"
          :errorMsg="$form.email?.error?.message"
        />
        <div class="phone-city">
          <InputMask class="phone" name="phone" label="Celular" />

          <div class="flex flex-col items-start gap-0.5 city">
            <label class="pl-1 text-sm font-semibold" for="inputtext"
              >Provincia</label
            >
            <Select
              v-model="selectedCity"
              :options="cities"
              optionLabel="name"
              class="w-full"
            />
          </div>
        </div>

        <div
          class="flex flex-col justify-center items-baseline mt-3 checkbox-wrapper"
        >
          <div class="title">Marcá la opción que corresponda:</div>
          <div class="flex flex-col justify-center items-baseline">
            <div class="flex items-center gap-2 mt-4">
              <RadioButton
                v-model="selectedOption"
                inputId="option1"
                name="option"
                value="option1"
              />
              <label for="option1" class="checkbox-labels">
                Tengo un emprendimiento que registra ventas
              </label>
            </div>
            <div class="flex items-center gap-2 mt-4">
              <RadioButton
                v-model="selectedOption"
                inputId="option2"
                name="option"
                value="option2"
              />
              <label for="option2" class="checkbox-labels">
                Estoy desarrollando el producto/ servicio
              </label>
            </div>
            <div class="flex items-center gap-2 mt-4">
              <RadioButton
                v-model="selectedOption"
                inputId="option3"
                name="option"
                value="option3"
              />
              <label for="option3" class="checkbox-labels">
                Quiero emprender pero no tengo claro el proyecto aún
              </label>
            </div>

            <div v-if="selectedOption === 'option1'" class="mt-4 text-left">
              <div class="title">
                ¿Hace cuanto tiempo realizaste la primera venta?
              </div>
              <div class="flex items-center gap-2 mt-4">
                <RadioButton
                  v-model="selectedOption1"
                  inputId="option1-option1"
                  name="option1"
                  value="option1-option1"
                />
                <label for="option3" class="checkbox-labels">
                  Mas de 2 años
                </label>
              </div>
              <div class="flex items-center gap-2 mt-4">
                <RadioButton
                  v-model="selectedOption1"
                  inputId="option1-option2"
                  name="option1"
                  value="option1-option2"
                />
                <label for="option3" class="checkbox-labels">
                  Menos de 2 años
                </label>
              </div>
              <div class="flex items-center gap-2 mt-4">
                <RadioButton
                  v-model="selectedOption1"
                  inputId="option1-option3"
                  name="option1"
                  value="option1-option3"
                />
                <label for="option3" class="checkbox-labels">
                  Menos de 6 meses
                </label>
              </div>
            </div>
          </div>
        </div>

        <Button
          class="mb-4 button-style"
          type="Submit"
          :loading="isPending"
          label="Comenzar"
          :disabled="isPending"
        />
      </Form>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import router from '@/router'
import { useLogin } from '@/composables/auth.js'
import {
  setAuthToLocalStorage,
  deleteAuthFromLocalStorage,
} from '@/helpers/auth'
import { loginFormSchema } from '@/helpers/validations'
import { showError } from '@/helpers/toast.js'
import { Form } from '@primevue/forms'
import { useToast } from 'primevue/usetoast'
import { yupResolver } from '@primevue/forms/resolvers/yup'
import { InputText, Button, InputMask } from '../components/form/index'
import Select from 'primevue/select'
import RadioButton from 'primevue/radiobutton'

const toast = useToast()
const selectedOption = ref(false)
const selectedOption1 = ref(false)

const initialValues = ref({
  username: '',
  email: '',
  phone: '',
  selectedCity: [],
  selectedCheckBox: false,
})

const { isPending, mutateAsync: login } = useLogin()

const selectedCity = ref()
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])

const handleLogin = async ({ states: { username, email, phone }, valid }) => {
  if (valid) {
    try {
      // const response = await login({
      //   username: username.value,
      //   email: email.value,
      //   phone: phone.value,
      // })
      // await setAuthToLocalStorage(response)
      // router.replace({ name: 'home' })
      const response = {
        nombre: username.value,
        email: email.value,
        celular: phone.value,
        provincia: selectedCity.value,
        //situacion (mandar ID)
        //primera venta (de opcion 1, id 1 ) - Tambien mandar ID, pero como propiedad por separado

        situacion:
          selectedOption.value === 'option1'
            ? { [selectedOption.value]: [selectedOption1.value] }
            : [selectedOption.value],
      }

      console.log({ response })
      router.replace({ name: 'home' })
    } catch (error) {
      console.log(error)
      // showError(
      //   { message: 'El correo no es de tipo válido', summary: 'Error' },
      //   toast
      // )
      // deleteAuthFromLocalStorage()
    }
  }
}

const resolver = yupResolver(loginFormSchema)

// onMounted(() => {
//   deleteAuthFromLocalStorage()
// })
</script>

<style lang="scss" scoped>
.header-image {
  background-image: url('/src/assets/image_fondo_home.svg');
  background-repeat: no-repeat;
  background-position: center 20%;
  background-size: cover;
  .header-text {
    font-family: 'Lora', serif;
    font-weight: 600;
    position: relative;
    color: #ffff;
    width: 100%;
    line-height: 100%;
    height: 41px;

    @media (max-width: 320px) {
      font-size: 32px;
      top: 40%;
    }
    @media (min-width: 321px) and (max-width: 529px) {
      font-size: 32px;
      top: 40%;
    }

    @media (min-width: 530px) and (max-width: 599px) {
      font-size: 32px;
      top: 40%;
    }

    @media (min-width: 600px) and (max-width: 799px) {
      font-size: 42px;
      top: 50%;
    }
    @media (min-width: 800px) and (max-width: 899px) {
      font-size: 45px;
      top: 50%;
    }

    @media (min-width: 900px) {
      font-size: 50px;
      top: 50%;
    }
  }
}

.first-section {
  width: 100%;
  margin-top: 50px;
  .wellcome-text {
    font-weight: 600;
    width: 90%;
    color: #333333;
    @media (max-width: 320px) {
      font-size: 24px;
    }
    @media (min-width: 321px) and (max-width: 529px) {
      font-size: 24px;
    }

    @media (min-width: 530px) {
      font-size: 32px;
      width: 100%;
    }
  }
  .wellcome-wrapper {
    width: 100%;
    margin-top: 15px;
    @media (max-width: 320px) {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }
    @media (min-width: 321px) and (max-width: 767px) {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
    }

    @media (min-width: 768px) {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: 80%;
    }

    .participa {
      font-weight: 600;
      font-size: 24px;
      color: #333333;

      @media (min-width: 800px) and (max-width: 899px) {
        width: 50%;
      }

      @media (min-width: 900px) {
        width: 50%;
      }

      .participa-first-text {
        width: 100%;
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
        @media (max-width: 320px) {
          width: 90%;
          font-size: 14px;
          line-height: 24px;
        }
        @media (min-width: 321px) and (max-width: 529px) {
          width: 90%;
          font-size: 14px;
        }
        @media (min-width: 530px) and (max-width: 599px) {
          width: 90%;
          font-size: 16px;
        }
        @media (min-width: 600px) and (max-width: 799px) {
          width: 80%;
          font-size: 16px;
        }
        @media (min-width: 800px) and (max-width: 899px) {
          width: 70%;
          font-size: 16px;
        }
        @media (min-width: 900px) and (max-width: 1023px) {
          width: 100%;
          font-size: 16px;
        }
        @media (min-width: 1024px) {
          width: 70%;
          font-size: 16px;
        }
      }
      .participa-second-text {
        font-weight: 400;
        line-height: 24px;
        @media (max-width: 320px) {
          width: 90%;
          font-size: 14px;
        }
        @media (min-width: 321px) and (max-width: 529px) {
          width: 90%;
          font-size: 14px;
        }

        @media (min-width: 530px) and (max-width: 599px) {
          width: 90%;
          font-size: 16px;
        }

        @media (min-width: 600px) and (max-width: 799px) {
          width: 80%;
          font-size: 16px;
        }
        @media (min-width: 800px) and (max-width: 899px) {
          width: 80%;
          font-size: 16px;
        }

        @media (min-width: 900px) and (max-width: 1023px) {
          width: 80%;
          font-size: 16px;
        }
        @media (min-width: 1024px) {
          width: 60%;
          font-size: 16px;
        }
      }
    }
  }
  .banner {
    border: 2px solid #2e7d33;
    background: #f2faf3;
    border-radius: 8px;
    color: #2e7d33;
    font-weight: 700;

    @media (max-width: 1023px) {
      width: 90%;
      font-size: 14px;
      padding: 2%;
      height: 60px;
    }
    @media (min-width: 1024px) {
      width: 67%;
      font-size: 18px;
      height: 80px;
    }
  }
}

.form-wrapper {
  background-color: #f2f2f2;
  margin: 3% 5%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: baseline;
  color: #333333;
  .first-text {
    font-weight: 700;
    @media (max-width: 529px) {
      width: 90%;
      font-size: 14px;
    }

    @media (min-width: 530px) and (max-width: 599px) {
      width: 85%;
      font-size: 18px;
    }

    @media (min-width: 600px) and (max-width: 799px) {
      width: 80%;
      font-size: 18px;
    }
    @media (min-width: 800px) and (max-width: 899px) {
      width: 80%;
      font-size: 24px;
    }

    @media (min-width: 900px) {
      width: 60%;
      font-size: 24px;
    }
  }

  .second-text {
    background-color: #14182c;
    color: #ffff;
    text-align: left;
    border-radius: 8px;
    @media (max-width: 529px) {
      width: 90%;
      font-size: 12px;
    }

    @media (min-width: 530px) and (max-width: 599px) {
      width: 85%;
      font-size: 12px;
    }

    @media (min-width: 600px) and (max-width: 799px) {
      width: 80%;
      font-size: 14px;
    }
    @media (min-width: 800px) and (max-width: 899px) {
      width: 80%;
      font-size: 15px;
    }

    @media (min-width: 900px) {
      width: 60%;
      font-size: 17px;
    }
  }

  .form-fields {
    @media (max-width: 529px) {
      width: 95%;
    }

    @media (min-width: 530px) and (max-width: 599px) {
      width: 90%;
    }

    @media (min-width: 600px) and (max-width: 799px) {
      width: 80%;
    }
    @media (min-width: 800px) and (max-width: 899px) {
      width: 80%;
    }

    @media (min-width: 900px) {
      width: 60%;
    }

    .phone-city {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      width: 100%;
      @media (max-width: 529px) {
        width: 100%;
      }

      @media (min-width: 900px) {
        flex-flow: row nowrap;
        justify-content: space-between;
        gap: 10px;
        width: 100%;
      }
      .phone {
        width: 100%;
        margin-bottom: 15px;
        @media (min-width: 900px) {
          width: 50%;
          margin-bottom: 0;
        }
      }
      .city {
        width: 100%;
        @media (min-width: 900px) {
          width: 50%;
        }
      }
    }
    .checkbox-wrapper {
      width: 100%;
      .title {
        font-weight: 600;
        @media (max-width: 529px) {
          font-size: 16px;
        }

        @media (min-width: 530px) and (max-width: 599px) {
          font-size: 16px;
        }

        @media (min-width: 600px) and (max-width: 799px) {
        }
        @media (min-width: 800px) and (max-width: 899px) {
        }

        @media (min-width: 900px) {
        }
      }
      .checkbox-labels {
        font-weight: 400;
        text-align: start;
        @media (max-width: 529px) {
          font-size: 12px;
        }

        @media (min-width: 530px) and (max-width: 599px) {
        }

        @media (min-width: 600px) and (max-width: 799px) {
        }
        @media (min-width: 800px) and (max-width: 899px) {
        }

        @media (min-width: 900px) {
        }
      }
    }
  }
}
</style>
