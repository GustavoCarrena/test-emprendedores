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
      :style="{ width: '40vw' }"
    >
      <template #header>
        <div class="flex justify-baseline items-center gap-2">
          <i class="pi pi-check-circle" style="color: green"></i>
          <div class="font-semibold">¡Test de Emprendedores completado!</div>
        </div>
      </template>

      <div class="flex flex-col">
        <div>Muchas gracias por participar</div>
        <div>
          Recordá que una vez finalizado el test, no podrás cambiar los
          resultados
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <Button
            label="Cancelar"
            severity="secondary"
            outlined
            @click="dialogVisible = false"
          />
          <Button
            label="Ver resultados"
            :loading="isResultsPending"
            :disabled="isResultsPending"
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
              />

              <div class="knob-title">
                <span>{{ step.title }}</span>

                <span class="text-wrap knob-subtitle">{{ step.subtitle }}</span>
              </div>
            </div>
          </template>
        </Step>
      </StepList>
      <StepPanels>
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
              @click="handleConfirm()"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
  <ResultsView v-else :results :data />
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
    return
  }
  activeStep.value = nextStep
}

const handleNavigation = (stepId) => {
  if (stepId > activeStep.value && !hasSelectedAllAnswers.value) {
    toast.add(warningMessageContent)
    return
  }
  activeStep.value = stepId
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
  await getResults()
}

const getResults = async () => {
  try {
    await fetchResults(payload.value)
    showResults.value = true
  } catch (error) {
    console.log(error)
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

const handleConfirm = () => {
  dialogVisible.value = true
}

const handleDialogAccept = () => {
  dialogVisible.value = false
  handleSubmit()
}
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
  width: 90vw;

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
      opacity: 0.3;
      width: 100%;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      @media (max-width: 1023px) {
        display: none;
      }
      @media (min-width: 1024px) {
        font-size: 0.6rem;
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
      justify-content: center;
      align-items: center;
      padding: 0;

      @media (min-width: 1024px) {
        width: 100%;
      }
      .knob-content {
        display: flex;
        flex-flow: row wrap;
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
          align-items: baseline;
          @media (min-width: 768px) and (max-width: 1023px) {
            font-size: 1.2rem;
          }
          @media (min-width: 1024px) {
            align-items: center;
            font-size: 1.1rem;
          }
          .knob-subtitle {
            @media (min-width: 1024px) {
              font-size: 1.05rem;
            }
          }
        }
      }
    }
  }
}

.buttons {
  width: 90vw;
  padding: 5% 0;
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 5% 9% 5% 5%;
  }
}

:deep(.knob-active.p-knob) {
  svg {
    width: 100px !important;
    height: 100px !important;
    @media (min-width: 1024px) {
      width: 120px !important;
      height: 120px !important;
    }
  }
}

:deep(.knob-inactive.p-knob) {
  svg {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>
