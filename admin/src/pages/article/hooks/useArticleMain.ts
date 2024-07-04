import { useState } from "react"
import constate from "constate"
import { useRequest } from "ahooks"
import { Modal } from "antd"
import api from "../api"
import dayjs from "dayjs"
import { FormValuesType } from "../components/ArticleModal"
import { PAGE_SIZE } from "../constant"

function useArticleMain() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchParams, setSearchParams] = useState({})
  const [categoryMap, setCategoryMap] = useState<
    { label: string; value: string }[]
  >([])
  const [tagMap, setTagMap] = useState<{ label: string; value: string }[]>([])
  const [currentRow, setCurrentRow] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modal, contextModal] = Modal.useModal()

  const { data, loading, run, refresh } = useRequest(api.getArticles, {
    defaultParams: [{ current: 1, pageSize: PAGE_SIZE }],
    onSuccess: (_, [params]) => {
      setCurrentPage(params.current)
    },
  })

  useRequest(api.getCategories, {
    onSuccess: (data) => {
      const res = data?.data?.list.map((v: any) => ({
        label: v.name,
        value: v.id,
      }))
      setCategoryMap(res)
    },
  })

  useRequest(api.getTags, {
    onSuccess: (data) => {
      const res = data?.data?.list.map((v: any) => ({
        label: v.name,
        value: v.id,
      }))
      setTagMap(res)
    },
  })

  const handleSearch = async (values: Record<string, any>) => {
    if (Array.isArray(values.createdAt) && values.createdAt.length > 0) {
      values.createdAt = [
        dayjs(values.createdAt[0]).format("YYYY-MM-DD"),
        dayjs(values.createdAt[1]).format("YYYY-MM-DD"),
      ]
    }
    setSearchParams(values)
    run({ ...values, current: 1, pageSize: PAGE_SIZE })
  }

  const handleCreate = () => {
    setModalOpen(true)
  }

  const handleCloseModal = async (append?: FormValuesType) => {
    if (append) {
      currentRow
        ? await api.updateArticle({ ...append, id: currentRow.id })
        : await api.addArticle(append)
      refresh()
    }
    setCurrentRow(null)
    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    modal.confirm({
      title: "Are you sure?",
      content: `You will delete record ${id}`,
      onOk: async () => {
        await api.removeArticle(id)
        refresh()
      },
    })
    return
  }

  const handleEdit = (record: any) => {
    setModalOpen(true)
    setCurrentRow(record)
  }

  const handlePageChange = (current: number, pageSize: number) => {
    run({ ...searchParams, current, pageSize })
  }

  return {
    currentPage,
    categoryMap,
    tagMap,
    modalOpen,
    contextModal,
    data,
    loading,
    currentRow,
    handleSearch,
    handleCreate,
    handleCloseModal,
    handleDelete,
    handleEdit,
    handlePageChange,
  }
}

const [ArticleMainProvider, useArticleMainContext] = constate(useArticleMain)

export { ArticleMainProvider, useArticleMainContext }
