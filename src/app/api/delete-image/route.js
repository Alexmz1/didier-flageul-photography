import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function DELETE(request) {
  try {
    const { key } = await request.json();

    if (!key) {
      return Response.json({ error: "Aucune clé fournie" }, { status: 400 });
    }

    // Supprimer le fichier d'UploadThing
    await utapi.deleteFiles(key);

    return Response.json({ success: true, message: "Image supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return Response.json(
      { error: error.message || "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}
