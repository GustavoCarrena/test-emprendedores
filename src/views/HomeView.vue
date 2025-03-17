<template>
  <span class="text-gray-700">{{ data[0] }}</span>
  <div class="card flex justify-center">
    <Stepper
      class="basis-[50rem]"
      value="1"
      linear
      @update:value="handleStepChange"
    >
      <StepList>
        <Step :class="active == 1 ? 'step' : 'inactive'">
          <template #default>
            <div class="step-content">
              <Knob
                v-model="knobValue1"
                :size="active == 1 ? 100 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="flex flex-col items-baseline">
                <span>Eje 1 de 4</span><span> Motivación y objetivos</span>
              </div>
            </div>
          </template>
        </Step>

        <Step :class="active == 2 ? 'step' : 'inactive'">
          <template #default>
            <div class="step-content">
              <Knob
                v-model="knobValue2"
                :size="active == 2 ? 100 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="flex flex-col items-baseline">
                <span>Eje 2 de 4</span><span> </span>
              </div>
            </div>
          </template>
        </Step>

        <Step :class="active == 3 ? 'step' : 'inactive'">
          <template #default>
            <div class="step-content">
              <Knob
                v-model="knobValue3"
                :size="active == 3 ? 100 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="flex flex-col items-baseline">
                <span>Eje 3 de 4</span><span> </span>
              </div>
            </div>
          </template>
        </Step>
        <Step :class="active == 4 ? 'step' : 'inactive'">
          <template #default>
            <div class="step-content">
              <Knob
                v-model="knobValue4"
                :size="active == 4 ? 100 : 80"
                readonly
                :min="0"
                :max="4"
                valueColor="#3E5A7E"
                textColor="#3E5A7E"
              />
              <div class="flex flex-col items-baseline">
                <span>Eje 4 de 4</span><span> </span>
              </div>
            </div>
          </template>
        </Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <Questions />
          <div class="flex pt-6 justify-end">
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              @click="activateCallback('2')"
            />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          Eje2
          <div class="flex pt-6 justify-between">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('1')"
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback('3')"
            />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          Eje 3
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
            ></div>
          </div>
          <div class="pt-6">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('2')"
            />
            <Button
              label="Next"
              icon="pi pi-arrow-right"
              iconPos="right"
              @click="activateCallback('4')"
            />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="4">
          Eje 4
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium"
            ></div>
          </div>
          <div class="pt-6">
            <Button
              label="Back"
              severity="secondary"
              icon="pi pi-arrow-left"
              @click="activateCallback('3')"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'
import Knob from 'primevue/knob'
import Questions from '@/components/questions/Questions.vue'
import { useQuestions } from '@/composables/questions.js'

const active = ref(1)
const knobValue1 = ref(1)
const knobValue2 = ref(2)
const knobValue3 = ref(3)

const { data, isPending } = useQuestions()
const knobValue4 = ref(4)

const handleStepChange = (newIndex) => {
  active.value = newIndex
}
</script>

<style scoped lang="scss">
:deep(.p-step-number) {
  display: none;
}

:deep(.p-knob-text) {
  background: blue;
  color: red !important;
}

:deep(.p-stepper-separator) {
  display: none;
}

.step {
  opacity: 1.3;
  @media (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .step-content {
    @media (max-width: 767px) {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
  }
}

.inactive {
  opacity: 0.3;
  @media (max-width: 767px) {
    display: none;
  }
}
</style>
