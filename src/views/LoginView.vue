<template>
  <div class="w-full h-48 header-image">
    <div class="w-full h-full header-text">Test de Emprendedores</div>
  </div>
  <section
    class="flex flex-col justify-center items-center gap-4 first-section"
  >
    <div class="wellcome-text">
      ¡Te damos la bienvenida al test para emprendedores!
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
        :validateOnValueUpdate="true"
        :resolver
        :initialValues
        @submit="handleLogin"
      >
        <InputText
          class="w-full"
          name="username"
          label="Nombre y Apellido *"
          :errorMsg="$form.username?.error?.message"
        />

        <InputText
          class="w-full"
          name="email"
          label="Correo Electrónico *"
          :errorMsg="$form.email?.error?.message"
        />
        <div class="phone-city">
          <InputMask class="phone" name="phone" label="Celular" />

          <div class="flex flex-col items-start gap-0.5 city">
            <label class="pl-1 text-sm font-semibold" for="inputtext"
              >Provincia *
              <span
                v-if="!selectedProvincia?.id"
                class="text-xs text-red-600 font-normal"
                >(Campo obligatorio)</span
              ></label
            >
            <Select
              v-model="selectedProvincia"
              :options="data?.provincias"
              optionLabel="nombre"
              class="w-full"
              :invalid="!selectedProvincia"
              :loading="optionsPending"
            >
              <template #option="{ option }">
                <span class="text-xs"> {{ option?.nombre }}</span>
              </template>
              <template #value="{ value }">
                <span
                  class="text-xs text-left w-full flex justify-baseline items-center h-6"
                >
                  {{ value?.nombre }}</span
                >
              </template>
            </Select>
          </div>
        </div>

        <div
          class="flex flex-col justify-center items-baseline mt-3 checkbox-wrapper"
        >
          <div class="title">
            Marcá la opción que corresponda: *
            <span
              v-if="!selectedOption"
              class="text-xs text-red-600 font-normal"
              >(Campo obligatorio)</span
            >
          </div>
          <div class="flex flex-col justify-center items-baseline">
            <div
              v-for="option in data?.situacion"
              :key="option.id"
              class="flex items-center gap-2 mt-4"
            >
              <RadioButton
                v-model="selectedOption"
                :inputId="option?.id.toString()"
                name="situacion"
                :value="option?.id"
              />
              <label :for="option?.id" class="checkbox-labels">
                {{ option.texto }}
              </label>
            </div>

            <div v-if="selectedOption === 1" class="mt-4 text-left">
              <div class="title">
                ¿Hace cuanto tiempo realizaste la primera venta?
                <span
                  v-if="selectedOption === 1 && !selectedOptionFirstSale"
                  class="text-xs text-red-600 font-normal"
                  >* (Campo obligatorio)</span
                >
              </div>
              <div
                v-for="option in data?.primera_venta"
                :key="option.id"
                class="flex items-center gap-2 mt-4"
              >
                <RadioButton
                  v-model="selectedOptionFirstSale"
                  :inputId="option?.id.toString()"
                  name="primera_venta"
                  :value="option?.id"
                />
                <label :for="option?.id" class="checkbox-labels">
                  {{ option.texto }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <Button
          class="my-6 w-48 button-style"
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
import { onMounted, ref, computed } from 'vue'
import router from '@/router'
import { useLogin } from '@/composables/auth.js'
import { useOptions } from '@/composables/loginOptions.js'
import {
  setAuthToLocalStorage,
  deleteAuthFromLocalStorage,
} from '@/helpers/auth'
import { deleteAnswersFromLocalStorage } from '@/helpers/answers.js'
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
const selectedOptionFirstSale = ref(false)
const selectedProvincia = ref({})

const initialValues = ref({
  username: '',
  email: '',
  phone: '',
  selectedProvincia: [],
  selectedOption: false,
})

const { isPending, mutateAsync: login } = useLogin()
const { isPending: optionsPending, data } = useOptions()

const manualValidations = computed(() =>
  selectedOption.value === 1
    ? selectedProvincia.value &&
      selectedOption.value &&
      selectedOptionFirstSale.value
    : selectedProvincia.value && selectedOption.value
)

const handleLogin = async ({ states: { username, email, phone }, valid }) => {
  if (valid && manualValidations.value) {
    try {
      // const response = await login({
      // email: email.value,
      // nombre: username.value,
      // celular: phone.value,
      // provincia: selectedProvincia.value?.id.toString(),
      // situacion: selectedOption.value,
      // primera_venta:
      //   selectedOption.value === 1 ? selectedOptionFirstSale.value : null,
      // await setAuthToLocalStorage(response)
      // router.replace({ name: 'home' })
      const response = {
        email: email.value,
        nombre: username.value,
        celular: phone.value,
        provincia: selectedProvincia.value?.id.toString(),
        situacion: selectedOption.value,
        primera_venta:
          selectedOption.value === 1 ? selectedOptionFirstSale.value : null,
      }

      console.log('response', { response })
      await setAuthToLocalStorage(response)
      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
      // showError(
      //   { message: 'El correo no es de tipo válido', summary: 'Error' },
      //   toast
      // )
      // deleteAuthFromLocalStorage()
      // deleteAnswersFromLocalStorage()
    }
  }
}

const resolver = yupResolver(loginFormSchema)

onMounted(() => {
  deleteAuthFromLocalStorage()
  deleteAnswersFromLocalStorage()
  console.log({ username: initialValues.value })
})
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
  margin-top: 45px;
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
