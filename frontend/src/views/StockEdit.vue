<template>
  <a-row align="center" justify="center" class="tw-w-full">
    <a-card
      class="ant-card-body"
      style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px; width: 700px"
    >
      <template #title>
        <a-tag color="warning" class="tw-px-4 tw-py-2">
          <a-row align="center" class="tw-h-full tw-items-center">
            <EditFilled class="tw-text-[1rem] tw-pr-2" />
            <span class="tw-font-bold tw-text-[1.5rem]">Edit product</span>
          </a-row>
        </a-tag>
      </template>
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="Name" v-bind="validateInfos.name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="Price" v-bind="validateInfos.price">
          <a-input-number style="width: 100%" v-model:value="formState.price" />
        </a-form-item>
        <a-form-item label="Stock" v-bind="validateInfos.stock">
          <a-input-number style="width: 100%" type="number" v-model:value="formState.stock" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <input type="file" @change="onFileSelected" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-row align="center" justify="center" class="tw-w-full">
            <a-card
              v-if="formState.imageURL"
              class="tw-rounded-md tw-drop-shadow-sm tw-w-full"
              hoverable
              @click="() => (previewVisible = true)"
            >
              <img :src="formState.imageURL!" class="tw-w-full tw-h-[225px] tw-object-contain" />
            </a-card>
            <a-modal
              :visible="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img
                alt="preview image"
                class="tw-w-full tw-h-[400px] tw-object-contain"
                :src="formState.imageURL!"
              />
            </a-modal>
          </a-row>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24 }">
          <a-row align="center" justify="end" :gutter="[10, 10]">
            <a-button class="tw-mr-2" type="primary" @click.prevent="onSubmit">Confirm</a-button>
            <a-button class="tw-mr-2" type="primary" ghost="" @click.prevent="resetFields"
              >Reset</a-button
            >
            <a-button @click="$router.push('/stock')">Cancel</a-button>
          </a-row>
        </a-form-item>
      </a-form>
    </a-card>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { Form } from 'ant-design-vue'
import api from '@/services/api'
import filters from '@/services/filters'
import { EditFilled } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'

interface stockFormInterface {
  id: string
  name: string
  price: number
  stock: number
  image: string | null
  imageURL: string
}

const useForm = Form.useForm
export default defineComponent({
  components: {
    EditFilled
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const previewVisible = ref(false)
    const previewTitle = ref('')
    const formState = reactive({
      id: '',
      name: '',
      price: 0,
      stock: 0,
      image: null,
      imageURL: null
    })

    const { resetFields, validate, validateInfos, initialModel } = useForm(
      formState,
      reactive({
        name: [
          {
            required: true,
            message: 'Please input name'
          }
        ],
        price: [
          {
            required: true,
            message: 'Please input price'
          }
        ],
        stock: [
          {
            required: true,
            message: 'Please input stock'
          }
        ]
      })
    )

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
    }

    const onSubmit = () => {
      validate()
        .then(async (res) => {
          const formData = new FormData()
          const { name, price, stock, image, id } = formState
          formData.append('id', id)
          formData.append('name', name)
          formData.append('stock', stock.toString())
          formData.append('price', price.toString())
          if (image) {
            formData.append('image', image!)
          }

          await api.updateProduct(formData)
          router.back()
        })
        .catch((err) => {
          alert(JSON.stringify(err))
        })
    }

    const onFileSelected = (event: any) => {
      const reader = new FileReader()
      reader.onload = (event: any) => {
        formState.imageURL = event.target.result
      }

      reader.readAsDataURL(event.target.files[0])
      formState.image = event.target.files[0]
    }

    const getProductImage = (image: any) => {
      if (typeof formState.image != 'string') {
        return formState.imageURL
      } else {
        return filters.fullImageUrl(image)
      }
    }

    // ADD initModel (initialModel is attribute from useForm)
    const setInitModel = (form: stockFormInterface) => {
      initialModel.id = form.id
      initialModel.name = form.name
      initialModel.price = form.price
      initialModel.stock = form.stock
      initialModel.image = form.image
      initialModel.imageURL = formState.imageURL
    }

    const setInitFormState = (form: stockFormInterface) => {
      formState.id = form.id
      formState.name = form.name
      formState.price = form.price
      formState.stock = form.stock
      formState.image = form.image as any
      formState.imageURL = getProductImage(form.image) as any
    }

    onMounted(async () => {
      const result = await api.getProductById(route.params.id)
      setInitFormState(result.data)
      setInitModel(result.data)
    })

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      validateInfos,
      formState,
      onSubmit,
      onFileSelected,
      getProductImage,
      handleCancel,
      previewTitle,
      previewVisible,
      resetFields
    }
  }
})
</script>
