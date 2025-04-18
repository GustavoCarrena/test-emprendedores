<template>
  <div v-if="!showResults" class="flex justify-center pt-4">
    <Toast
      position="top-center"
      group="top-center"
      style="width: 70vw; max-width: 400px"
    />
    <Dialog
      v-model:visible="dialogVisible"
      :modal="true"
      :closable="false"
      :dismissableMask="false"
      :closeOnEscape="false"
      :style="{ width: '70vw', 'max-width': '500px' }"
      contentClass="flex justify-between items-center !w-full"
    >
      <template #header>
        <div class="flex justify-baseline items-center gap-2">
          <i class="pi pi-check-circle" style="color: green"></i>
          <div class="font-semibold">¡Test de Emprendedores completado!</div>
        </div>
      </template>

      <div class="flex flex-col text-sm">
        <div class="pb-2">Muchas gracias por participar</div>
        <div>
          Recordá que una vez finalizado el test, no podrás cambiar los
          resultados
        </div>
      </div>
      <template #footer>
        <div class="flex justify-between items-center w-full gap-2">
          <Button
            label="Cancelar"
            severity="secondary"
            outlined
            size="small"
            @click="dialogVisible = false"
          />
          <Button
            label="Ver resultados"
            :loading="isResultsPending"
            :disabled="isResultsPending"
            size="small"
            @click="handleDialogAccept"
          />
        </div>
      </template>
    </Dialog>
    <Stepper
      class="stepper"
      :value="activeStep.toString()"
      linear
      @update:value="handleStepChange"
    >
      <StepList class="step-list">
        <Step
          v-for="step in steps"
          :key="step.id"
          :class="activeStep === step.id ? 'step' : 'inactive'"
        >
          <template #default>
            <div class="knob-content">
              <div
                v-if="completedSteps?.includes(step.id)"
                style="
                  background-color: green;
                  width: 65px;
                  height: 65px;
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  margin-bottom: 10px;
                "
              >
                <i
                  class="pi pi-check"
                  style="color: whitesmoke; font-size: 1.5rem; font-weight: 800"
                ></i>
              </div>
              <div v-else class="knob-wrapper">
                <Knob
                  v-model="step.value"
                  readonly
                  :min="0"
                  :max="4"
                  :class="
                    activeStep === step.id ? 'knob-active' : 'knob-inactive'
                  "
                  valueColor="#3E5A7E"
                  textColor="#3E5A7E"
                  :showValue="false"
                />
                <div class="knob-image-container">
                  <img
                    :src="stepsImages(step.value)"
                    alt="Step"
                    class="knob-image"
                  />
                </div>
              </div>

              <div class="knob-title">
                <span>{{ step.title }}</span>

                <span class="text-wrap knob-subtitle">{{ step.subtitle }}</span>
              </div>
            </div>
          </template>
        </Step>
      </StepList>
      <StepPanels>
        <div
          v-for="step in steps"
          :key="`panel-${step.id}`"
          class="step-subtitle"
        >
          <div
            v-if="step.id == activeStep"
            class="flex justify-baseline items-center"
          >
            <span>
              <img
                :src="stepsImages(step.value)"
                alt="Step"
                class="knob-image pr-2"
            /></span>
            {{ step.subtitle }}
          </div>
        </div>
        <StepPanel
          v-for="step in steps"
          :key="`panel-${step.id}`"
          :value="step.id.toString()"
        >
          <Questions v-if="data" v-model="payload" :data="filteredQuestions" />
          <div
            class="flex pt-8 buttons"
            :class="step.showBack ? 'justify-between' : 'justify-end'"
          >
            <Button
              v-if="step.showBack"
              label="Anterior"
              severity="secondary"
              icon="pi pi-arrow-left"
              :loading="isPending"
              :disabled="isPending"
              @click="handleNavigation(step.id - 1)"
            />

            <Button
              v-if="step.showNext"
              label="Continuar"
              icon="pi pi-arrow-right"
              iconPos="right"
              :loading="isPending"
              :disabled="isPending"
              class="continue-button"
              @click="handleNavigation(step.id + 1)"
            />

            <Button
              v-if="step.submit"
              label="Finalizar"
              icon="pi pi-arrow-right"
              iconPos="right"
              :loading="isPending"
              :disabled="isPending"
              class="continue-button"
              @click="handleConfirm(step.id + 1)"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
  <div v-else class="w-full flex flex-col justify-baseline items-center">
    <ResultsView :results :data />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Dialog from 'primevue/dialog'
import { useToast } from 'primevue/usetoast'
import Knob from 'primevue/knob'
import Toast from 'primevue/toast'
import Questions from '@/components/questions/Questions.vue'
import { useQuestions } from '@/composables/questions.js'
import { useResults } from '@/composables/results.js'
import ResultsView from './ResultsView.vue'
import { warningMessageContent } from '@/constants/messages/messages'
import step1Image from '@/assets/step-1.svg'
import step2Image from '@/assets/step-2.svg'
import step3Image from '@/assets/step-3.svg'
import step4Image from '@/assets/step-4.svg'
import 'primeicons/primeicons.css'
import {
  setAnswersToLocalStorage,
  deleteAnswersFromLocalStorage,
} from '@/helpers/answers.js'

const { data, isPending } = useQuestions()
const {
  data: results,
  isPending: isResultsPending,
  fetchResults,
} = useResults()
const activeStep = ref(1)
const toast = useToast()
//cambiar a false
const showResults = ref(false)
const dialogVisible = ref(false)
const payload = ref([])

const stepsImages = (step) => {
  if (step == 1) return step1Image
  if (step == 2) return step2Image
  if (step == 3) return step3Image
  if (step == 4) return step4Image
}

const filteredQuestions = computed(() => {
  return data.value.filter((q) => q.id === activeStep.value) || []
})

const steps = computed(() => {
  if (!data.value || data.value.length === 0) return []
  return data.value.map((step, index) => ({
    id: step.id,
    title: `Eje ${step.id} de ${data.value.length}`,
    subtitle: step.titulo,
    value: index + 1,
    showBack: index !== 0,
    showNext: index !== data.value.length - 1,
    submit: index === data.value.length - 1,
  }))
})

const handleStepChange = (step) => {
  const nextStep = Number(step)
  if (nextStep > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add(warningMessageContent)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  activeStep.value = nextStep
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleNavigation = (stepId) => {
  if (stepId > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add(warningMessageContent)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  activeStep.value = stepId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSubmit = async () => {
  let totalQuestions = 0
  data.value.forEach((step) => {
    totalQuestions += step.preguntas.length
  })

  if (payload.value.length !== totalQuestions) {
    toast.add(warningMessageContent)
    return
  }
  console.log('✅ Payload final:', payload.value)
  setAnswersToLocalStorage(payload.value)
  await getResults()
}

const getResults = async () => {
  try {
    await fetchResults(payload.value)
    showResults.value = true
  } catch (error) {
    console.log(error)
    deleteAnswersFromLocalStorage()
  }
}

const hasSelectedAllAnswers = computed(() => {
  if (!data.value || !filteredQuestions.value) return false
  const currentStepQuestions = filteredQuestions.value[0]?.preguntas || []
  const currentStepAnswers = payload.value.filter((answerId) => {
    return currentStepQuestions.some((question) =>
      question.respuestas.some((answer) => answer.respuesta_id === answerId)
    )
  })
  return currentStepAnswers.length === currentStepQuestions.length
})

const handleConfirm = (stepId) => {
  if (stepId > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add(warningMessageContent)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  } else {
    dialogVisible.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleDialogAccept = () => {
  dialogVisible.value = false
  handleSubmit()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const completedSteps = computed(() => {
  if (!data.value || payload.value.length === 0) {
    deleteAnswersFromLocalStorage()
    return []
  }
  return data.value
    .filter((step) =>
      step.preguntas.every((question) =>
        question.respuestas.some((res) =>
          payload.value.includes(res.respuesta_id)
        )
      )
    )
    .map((step) => step.id)
})
</script>

<style scoped lang="scss">
:deep(.p-step-number) {
  display: none;
}

:deep(.p-stepper-separator) {
  display: none;
}

:deep(.p-toast) {
  @media (max-width: 767px) {
    width: 80% !important;
    left: 5% !important;
    right: 5% !important;
  }
}

.stepper {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  .step-list {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    @media (min-width: 1024px) {
      width: 100%;
      margin-bottom: 15px;
    }
    .inactive {
      opacity: 0.35;
      width: 100%;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      @media (max-width: 1023px) {
        display: none;
      }
      @media (min-width: 1024px) {
        font-size: 0.75rem;
        .knob-title {
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
        }
      }

      .knob-content {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
      }
    }
    .step {
      opacity: 1.3;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      padding: 0;

      @media (min-width: 1024px) {
        width: 100%;
      }
      .knob-content {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        gap: 0.2rem;
        width: 100%;

        @media (min-width: 1024px) {
          width: 100%;
          max-width: 30vw;
        }
        .knob-icon {
          width: 30px;
          padding-right: 5px;
        }
        .knob-title {
          font-weight: 600;
          display: flex;
          flex-flow: column wrap;
          justify-content: center;
          align-items: center;
          font-size: 1.1rem;
          @media (min-width: 768px) {
            font-size: 1.3rem;
          }
          @media (min-width: 1024px) {
            align-items: center;
            font-size: 1rem;
          }
          .knob-subtitle {
            color: #3e5a7e;
            font-size: 1.2rem;
            @media (min-width: 768px) and (max-width: 1023px) {
              display: none;
            }
            @media (min-width: 1024px) {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
}

.step-subtitle {
  display: none;
  @media (min-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #3e5a7e;
    font-weight: 800;
    font-size: 1.75rem;
    margin-bottom: 15px;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
    margin-bottom: 0;
  }
  @media (min-width: 1439px) {
    font-size: 2.6rem;
  }
}

.buttons {
  width: 90vw;
  padding: 5% 0;
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 5% 2% 5% 2%;
  }
  @media (min-width: 1024px) {
    padding: 5% 3% 5% 3%;
  }
}

.knob-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.knob-image-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.p-knob) {
  .knob-image-container {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
  }

  .knob-image,
  svg {
    width: 70px;
    height: 70px;
  }
}

:deep(.p-steppanels) {
  width: initial;
}

:deep(.p-dialog-footer) {
  padding: 1px 0 !important;
  width: 100%;
  background-color: aquamarine;
}
</style>
