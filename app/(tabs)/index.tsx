import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Index = () => {
  const [form, setForm] = useState({
    name: "",
    jenis: "wajib",
    waktu: "",
  });

  const [updateId, setUpdateId] = useState<number | null>(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    jenis: "wajib",
    waktu: "",
  });

  interface IbadahItem {
    id: number;
    name: string;
    jenis: string;
    waktu: string;
  }

  const [ibadah, setIbadah] = useState<IbadahItem[]>([]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleEdit = (item: IbadahItem) => {
    setUpdateId(item.id);
    setUpdateData({
      name: item.name,
      jenis: item.jenis,
      waktu: item.waktu,
    });
  };

  const handleUpdate = async () => {
    if (
      updateData.name.trim() === "" ||
      updateData.jenis.trim() === "" ||
      updateData.waktu.trim() === ""
    ) {
      alert("Semua field harus diisi");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/ibadah/${updateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert("Data berhasil diubah");
        setUpdateId(null);
        setUpdateData({
          name: "",
          jenis: "wajib",
          waktu: "",
        });
        getIbadah();
      } else {
        alert("Gagal mengubah data" + data.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Terjadi kesalahan saat mengubah data");
    }
  };

  const getIbadah = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ibadah");
      const data = await response.json();
      setIbadah(data);
    } catch (error) {
      console.error("Eror gabisa menampilkan data:", error);
    }
  };

  const handleSubmit = async () => {
    if (
      form.name.trim() === "" ||
      form.jenis.trim() === "" ||
      form.waktu.trim() === ""
    ) {
      alert("Semua field harus diisi");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ibadah", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Data berhasil ditambahkan");
        setForm({
          name: "",
          jenis: "wajib",
          waktu: "",
        });
        getIbadah();
      } else {
        alert("Gagal menambahkan data" + data.message);
      }
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Terjadi kesalahan saat menambahkan data");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/ibadah/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Data berhasil dihapus");
        getIbadah();
      } else {
        alert("Gagal menghapus data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Terjadi kesalahan saat menghapus data");
    }
  };

  useEffect(() => {
    getIbadah();
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>
      <ScrollView>
        <View style={tw`p-6`}>
          <View style={tw`bg-white rounded-2xl shadow-lg p-6 mb-8`}>
            <Text
              style={tw`text-3xl font-bold mb-2 text-center text-emerald-800`}
            >
              Manajemen Ibadah
            </Text>
            <Text style={tw`text-gray-600 text-center mb-6`}>
              Catat dan kelola aktivitas ibadah Anda dengan mudah
            </Text>

            <View style={tw`bg-gray-50 p-6 rounded-xl mb-6`}>
              <TextInput
                style={tw`h-[50px] border border-gray-200 rounded-xl px-4 mb-4 text-base bg-white shadow-sm`}
                placeholder="Nama Ibadah"
                placeholderTextColor="#666"
                value={updateId ? updateData.name : form.name}
                onChangeText={(value: string) => {
                  if (updateId) {
                    setUpdateData({ ...updateData, name: value });
                  } else {
                    handleChange("name", value);
                  }
                }}
              />

              <View
                style={tw`border border-gray-200 rounded-xl mb-4 bg-white shadow-sm`}
              >
                <Picker
                  selectedValue={updateId ? updateData.jenis : form.jenis}
                  onValueChange={(value: string) => {
                    if (updateId) {
                      setUpdateData({ ...updateData, jenis: value });
                    } else {
                      handleChange("jenis", value);
                    }
                  }}
                  style={tw`h-[50px] px-4`}
                >
                  <Picker.Item label="Wajib" value="wajib" />
                  <Picker.Item label="Sunah" value="sunah" />
                </Picker>
              </View>

              <TextInput
                style={tw`h-[50px] border border-gray-200 rounded-xl px-4 mb-6 text-base bg-white shadow-sm`}
                placeholder="Waktu Ibadah"
                placeholderTextColor="#666"
                value={updateId ? updateData.waktu : form.waktu}
                onChangeText={(value: string) => {
                  if (updateId) {
                    setUpdateData({ ...updateData, waktu: value });
                  } else {
                    handleChange("waktu", value);
                  }
                }}
              />

              <TouchableOpacity
                style={tw`bg-emerald-600 h-[50px] rounded-xl items-center justify-center shadow-md`}
                onPress={updateId !== null ? handleUpdate : handleSubmit}
              >
                <Text style={tw`text-white text-lg font-bold`}>
                  {updateId !== null ? "Perbarui Data" : "Simpan Data"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={tw`bg-white rounded-2xl shadow-lg p-6`}>
            <Text
              style={tw`text-2xl font-bold mb-2 text-center text-emerald-800`}
            >
              Daftar Ibadah
            </Text>
            <Text style={tw`text-gray-600 text-center mb-6`}>
              Rekaman perjalanan ibadah Anda
            </Text>

            {ibadah.map((item, index) => (
              <View
                key={index}
                style={tw`bg-gray-50 p-6 rounded-xl mb-4 border border-gray-100`}
              >
                <Text style={tw`text-xl font-bold text-emerald-800 mb-2`}>
                  {item.name}
                </Text>
                <View style={tw`flex-row items-center mb-2`}>
                  <Text style={tw`text-gray-600 font-medium`}>Jenis: </Text>
                  <View style={tw`bg-emerald-100 px-3 py-1 rounded-full`}>
                    <Text style={tw`text-emerald-800 font-medium`}>
                      {item.jenis}
                    </Text>
                  </View>
                </View>
                <Text style={tw`text-gray-600 mb-4`}>Waktu: {item.waktu}</Text>

                <View style={tw`flex-row space-x-3`}>
                  <TouchableOpacity
                    style={tw`flex-1 bg-red-500 h-[40px] rounded-xl items-center justify-center shadow-sm`}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={tw`text-white font-bold`}>Hapus</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`flex-1 bg-amber-500 h-[40px] rounded-xl items-center justify-center shadow-sm`}
                    onPress={() => handleEdit(item)}
                  >
                    <Text style={tw`text-white font-bold`}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
